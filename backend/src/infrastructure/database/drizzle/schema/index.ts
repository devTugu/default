import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import type {
  SiteSettingsAbout,
  SiteSettingsContactInfo,
  SiteSettingsFooter,
  SiteSettingsHeader,
  SiteSettingsHero,
  SiteSettingsSecurity,
  SiteSettingsSeo,
  SiteSettingsTheme,
} from '@domain/site-setting/entities/site-settings.entity';

/** Multi-org UI is out of scope; schema is tenancy-ready with a single default org. */
export const organizations = pgTable(
  'organizations',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 100 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex('UQ_organizations_slug').on(table.slug)],
);

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }),
    isActive: boolean('isActive').notNull().default(true),
    oauthProvider: varchar('oauth_provider', { length: 50 }),
    oauthSubject: varchar('oauth_subject', { length: 255 }),
    mfaEnabled: boolean('mfa_enabled').notNull().default(false),
    mfaSecretEncrypted: text('mfa_secret_encrypted'),
    failedLoginAttempts: integer('failed_login_attempts').notNull().default(0),
    lockedUntil: timestamp('locked_until', { mode: 'date', precision: 6 }),
    organizationId: integer('organization_id'),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at', { mode: 'date', precision: 6 }),
  },
  (table) => [
    uniqueIndex('UQ_users_email').on(table.email),
    index('IDX_users_email').on(table.email),
    uniqueIndex('UQ_users_oauth').on(table.oauthProvider, table.oauthSubject),
    index('IDX_users_organization_id').on(table.organizationId),
  ],
);

export const organizationMembers = pgTable(
  'organization_members',
  {
    id: serial('id').primaryKey(),
    organizationId: integer('organization_id').notNull(),
    userId: integer('user_id').notNull(),
    role: varchar('role', { length: 32 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
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

export const roles = pgTable(
  'roles',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at', { mode: 'date', precision: 6 }),
  },
  (table) => [
    uniqueIndex('UQ_roles_name').on(table.name),
    index('IDX_roles_name').on(table.name),
  ],
);

export const permissions = pgTable(
  'permissions',
  {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('UQ_permissions_code').on(table.code),
    index('IDX_permissions_code').on(table.code),
  ],
);

export const userRoles = pgTable(
  'user_roles',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    roleId: integer('role_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('UQ_user_roles_user_role').on(table.userId, table.roleId),
    index('IDX_user_roles_user_id').on(table.userId),
    index('IDX_user_roles_role_id').on(table.roleId),
  ],
);

export const rolePermissions = pgTable(
  'role_permissions',
  {
    id: serial('id').primaryKey(),
    roleId: integer('role_id').notNull(),
    permissionId: integer('permission_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('UQ_role_permissions_role_perm').on(
      table.roleId,
      table.permissionId,
    ),
  ],
);

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    tokenHash: varchar('token_hash', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
    revokedAt: timestamp('revoked_at', { mode: 'date' }),
    userAgent: varchar('user_agent', { length: 512 }),
    ipAddress: varchar('ip_address', { length: 45 }),
    lastSeenAt: timestamp('last_seen_at', { mode: 'date', precision: 6 }),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('IDX_refresh_tokens_user_id').on(table.userId),
    index('IDX_refresh_tokens_token_hash').on(table.tokenHash),
  ],
);

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    organizationId: integer('organization_id'),
    action: varchar('action', { length: 100 }).notNull(),
    resource: varchar('resource', { length: 100 }).notNull(),
    resourceId: varchar('resource_id', { length: 64 }),
    ipAddress: varchar('ip_address', { length: 45 }),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    createdAt: timestamp('created_at', { mode: 'date' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index('IDX_audit_user_id').on(table.userId),
    index('IDX_audit_organization_id').on(table.organizationId),
  ],
);

export const siteSettings = pgTable(
  'site_settings',
  {
    id: integer('id').primaryKey(),
    organizationId: integer('organization_id'),
    hero: jsonb('hero').$type<SiteSettingsHero>().notNull(),
    header: jsonb('header').$type<SiteSettingsHeader>().notNull(),
    footer: jsonb('footer').$type<SiteSettingsFooter>().notNull(),
    seo: jsonb('seo').$type<SiteSettingsSeo>().notNull(),
    contactInfo: jsonb('contact_info')
      .$type<SiteSettingsContactInfo>()
      .notNull(),
    theme: jsonb('theme').$type<SiteSettingsTheme>().notNull(),
    about: jsonb('about').$type<SiteSettingsAbout>().notNull(),
    security: jsonb('security').$type<SiteSettingsSecurity>().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow()
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
