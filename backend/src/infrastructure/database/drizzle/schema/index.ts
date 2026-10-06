import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  datetime,
  index,
  int,
  json,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';
import type {
  SiteSettingsAbout,
  SiteSettingsContactInfo,
  SiteSettingsFooter,
  SiteSettingsHeader,
  SiteSettingsHero,
  SiteSettingsSeo,
  SiteSettingsTheme,
} from '@domain/site-setting/entities/site-settings.entity';

/** Multi-org UI is out of scope; schema is tenancy-ready with a single default org. */
export const organizations = mysqlTable(
  'organizations',
  {
    id: int('id').autoincrement().primaryKey(),
    slug: varchar('slug', { length: 100 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`),
    updatedAt: datetime('updated_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`)
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex('UQ_organizations_slug').on(table.slug)],
);

export const users = mysqlTable(
  'users',
  {
    id: int('id').autoincrement().primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }),
    isActive: boolean('isActive').notNull().default(true),
    oauthProvider: varchar('oauth_provider', { length: 50 }),
    oauthSubject: varchar('oauth_subject', { length: 255 }),
    mfaEnabled: boolean('mfa_enabled').notNull().default(false),
    mfaSecretEncrypted: text('mfa_secret_encrypted'),
    failedLoginAttempts: int('failed_login_attempts').notNull().default(0),
    lockedUntil: datetime('locked_until', { mode: 'date', fsp: 6 }),
    organizationId: int('organization_id'),
    createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`),
    updatedAt: datetime('updated_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`)
      .$onUpdate(() => new Date()),
    deletedAt: datetime('deleted_at', { mode: 'date', fsp: 6 }),
  },
  (table) => [
    uniqueIndex('UQ_users_email').on(table.email),
    index('IDX_users_email').on(table.email),
    uniqueIndex('UQ_users_oauth').on(table.oauthProvider, table.oauthSubject),
    index('IDX_users_organization_id').on(table.organizationId),
  ],
);

export const organizationMembers = mysqlTable(
  'organization_members',
  {
    id: int('id').autoincrement().primaryKey(),
    organizationId: int('organization_id').notNull(),
    userId: int('user_id').notNull(),
    role: varchar('role', { length: 32 }).notNull(),
    createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`),
  },
  (table) => [
    uniqueIndex('UQ_organization_members_org_user').on(
      table.organizationId,
      table.userId,
    ),
    index('IDX_organization_members_org_id').on(table.organizationId),
    index('IDX_organization_members_user_id').on(table.userId),
  ],
);

export const roles = mysqlTable(
  'roles',
  {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`),
    updatedAt: datetime('updated_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`)
      .$onUpdate(() => new Date()),
    deletedAt: datetime('deleted_at', { mode: 'date', fsp: 6 }),
  },
  (table) => [
    uniqueIndex('UQ_roles_name').on(table.name),
    index('IDX_roles_name').on(table.name),
  ],
);

export const permissions = mysqlTable(
  'permissions',
  {
    id: int('id').autoincrement().primaryKey(),
    code: varchar('code', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`),
    updatedAt: datetime('updated_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('UQ_permissions_code').on(table.code),
    index('IDX_permissions_code').on(table.code),
  ],
);

export const userRoles = mysqlTable(
  'user_roles',
  {
    id: int('id').autoincrement().primaryKey(),
    userId: int('user_id').notNull(),
    roleId: int('role_id').notNull(),
    createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`),
  },
  (table) => [
    uniqueIndex('UQ_user_roles_user_role').on(table.userId, table.roleId),
    index('IDX_user_roles_user_id').on(table.userId),
    index('IDX_user_roles_role_id').on(table.roleId),
  ],
);

export const rolePermissions = mysqlTable(
  'role_permissions',
  {
    id: int('id').autoincrement().primaryKey(),
    roleId: int('role_id').notNull(),
    permissionId: int('permission_id').notNull(),
    createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`),
  },
  (table) => [
    uniqueIndex('UQ_role_permissions_role_perm').on(
      table.roleId,
      table.permissionId,
    ),
  ],
);

export const refreshTokens = mysqlTable(
  'refresh_tokens',
  {
    id: int('id').autoincrement().primaryKey(),
    userId: int('user_id').notNull(),
    tokenHash: varchar('token_hash', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
    revokedAt: timestamp('revoked_at', { mode: 'date' }),
    createdAt: datetime('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`),
  },
  (table) => [
    index('IDX_refresh_tokens_user_id').on(table.userId),
    index('IDX_refresh_tokens_token_hash').on(table.tokenHash),
  ],
);

export const auditLogs = mysqlTable(
  'audit_logs',
  {
    id: int('id').autoincrement().primaryKey(),
    userId: int('user_id'),
    organizationId: int('organization_id'),
    action: varchar('action', { length: 100 }).notNull(),
    resource: varchar('resource', { length: 100 }).notNull(),
    resourceId: varchar('resource_id', { length: 64 }),
    ipAddress: varchar('ip_address', { length: 45 }),
    metadata: json('metadata').$type<Record<string, unknown> | null>(),
    createdAt: datetime('created_at', { mode: 'date' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index('IDX_audit_user_id').on(table.userId),
    index('IDX_audit_organization_id').on(table.organizationId),
  ],
);

export const siteSettings = mysqlTable(
  'site_settings',
  {
    id: int('id').primaryKey(),
    organizationId: int('organization_id'),
    hero: json('hero').$type<SiteSettingsHero>().notNull(),
    header: json('header').$type<SiteSettingsHeader>().notNull(),
    footer: json('footer').$type<SiteSettingsFooter>().notNull(),
    seo: json('seo').$type<SiteSettingsSeo>().notNull(),
    contactInfo: json('contact_info')
      .$type<SiteSettingsContactInfo>()
      .notNull(),
    theme: json('theme').$type<SiteSettingsTheme>().notNull(),
    about: json('about').$type<SiteSettingsAbout>().notNull(),
    updatedAt: datetime('updated_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6)`)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('IDX_site_settings_organization_id').on(table.organizationId),
  ],
);

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  users: many(users),
}));

export const organizationMembersRelations = relations(
  organizationMembers,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationMembers.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [organizationMembers.userId],
      references: [users.id],
    }),
  }),
);

export const usersRelations = relations(users, ({ many, one }) => ({
  userRoles: many(userRoles),
  refreshTokens: many(refreshTokens),
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
  rolePermissions: many(rolePermissions),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));

export const schema = {
  organizations,
  organizationMembers,
  users,
  roles,
  permissions,
  userRoles,
  rolePermissions,
  refreshTokens,
  auditLogs,
  siteSettings,
  organizationsRelations,
  organizationMembersRelations,
  usersRelations,
  rolesRelations,
  permissionsRelations,
  userRolesRelations,
  rolePermissionsRelations,
  refreshTokensRelations,
};

export type DrizzleSchema = typeof schema;
