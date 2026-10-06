import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import { and, eq, isNull } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { DEFAULT_SITE_SETTINGS } from '@domain/site-setting/entities/site-settings.entity';
import { OrganizationMembership } from '@domain/organization/entities/organization-membership.entity';
import {
  organizationMembers,
  organizations,
  permissions,
  rolePermissions,
  roles,
  schema,
  siteSettings,
  userRoles,
  users,
} from '../drizzle/schema';
import {
  E2E_VIEWER_PERMISSION_CODES,
  E2E_VIEWER_ROLE_NAME,
  PERMISSION_CODES,
  SITE_EDITOR_PERMISSION_CODES,
  SITE_EDITOR_ROLE_NAME,
  SUPER_ADMIN_ROLE_NAME,
} from './permissions.const';

dotenv.config({ path: '.env' });

const useSsl = process.env.DB_SSL === 'true';

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!';
const VIEWER_EMAIL = process.env.SEED_VIEWER_EMAIL ?? 'viewer@example.com';
const VIEWER_PASSWORD = process.env.SEED_VIEWER_PASSWORD ?? 'Viewer123!';
const DEFAULT_ORG_SLUG = process.env.ORGANIZATION_DEFAULT_SLUG ?? 'default';

async function runSeed(): Promise<void> {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 2,
    connectTimeout: 15000,
    ...(useSsl && { ssl: { rejectUnauthorized: true } }),
  });

  const db = drizzle(pool, { schema, mode: 'default' });

  // Tenancy-ready: single default org (multi-org UI out of scope).
  let defaultOrg = await db.query.organizations.findFirst({
    where: eq(organizations.slug, DEFAULT_ORG_SLUG),
  });
  if (!defaultOrg) {
    const [inserted] = await db.insert(organizations).values({
      slug: DEFAULT_ORG_SLUG,
      name: 'Default',
    });
    defaultOrg = await db.query.organizations.findFirst({
      where: eq(organizations.id, Number(inserted.insertId)),
    });
    console.log('Created default organization:', DEFAULT_ORG_SLUG);
  }
  if (!defaultOrg) throw new Error('DEFAULT_ORGANIZATION_MISSING');

  let superAdminRole = await db.query.roles.findFirst({
    where: eq(roles.name, SUPER_ADMIN_ROLE_NAME),
  });
  if (!superAdminRole) {
    const [inserted] = await db.insert(roles).values({
      name: SUPER_ADMIN_ROLE_NAME,
      description: 'Super administrator with all permissions',
    });
    superAdminRole = await db.query.roles.findFirst({
      where: eq(roles.id, Number(inserted.insertId)),
    });
    console.log('Created SUPER_ADMIN role');
  }
  if (!superAdminRole) throw new Error('SUPER_ADMIN_ROLE_MISSING');

  for (const code of PERMISSION_CODES) {
    const existing = await db.query.permissions.findFirst({
      where: eq(permissions.code, code),
    });
    if (!existing) {
      await db.insert(permissions).values({ code, description: code });
      console.log('Created permission:', code);
    }
  }

  const allPerms = await db.select().from(permissions);
  const existingRp = await db
    .select()
    .from(rolePermissions)
    .where(eq(rolePermissions.roleId, superAdminRole.id));
  const existingPermIds = new Set(existingRp.map((rp) => rp.permissionId));
  for (const p of allPerms) {
    if (existingPermIds.has(p.id)) continue;
    await db.insert(rolePermissions).values({
      roleId: superAdminRole.id,
      permissionId: p.id,
    });
  }

  let adminUser = await db.query.users.findFirst({
    where: eq(users.email, ADMIN_EMAIL),
  });
  if (!adminUser) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    const [inserted] = await db.insert(users).values({
      email: ADMIN_EMAIL,
      passwordHash,
      isActive: true,
      organizationId: defaultOrg.id,
    });
    adminUser = await db.query.users.findFirst({
      where: eq(users.id, Number(inserted.insertId)),
    });
    console.log('Created admin user:', ADMIN_EMAIL);
  } else {
    await db
      .update(users)
      .set({ mfaEnabled: false, mfaSecretEncrypted: null })
      .where(eq(users.id, adminUser.id));
  }
  if (!adminUser) throw new Error('ADMIN_USER_MISSING');

  const existingUr = await db.query.userRoles.findFirst({
    where: and(
      eq(userRoles.userId, adminUser.id),
      eq(userRoles.roleId, superAdminRole.id),
    ),
  });
  if (!existingUr) {
    await db.insert(userRoles).values({
      userId: adminUser.id,
      roleId: superAdminRole.id,
    });
  }

  let siteEditorRole = await db.query.roles.findFirst({
    where: eq(roles.name, SITE_EDITOR_ROLE_NAME),
  });
  if (!siteEditorRole) {
    const [inserted] = await db.insert(roles).values({
      name: SITE_EDITOR_ROLE_NAME,
      description: 'Website content editor (site settings)',
    });
    siteEditorRole = await db.query.roles.findFirst({
      where: eq(roles.id, Number(inserted.insertId)),
    });
    console.log('Created SITE_EDITOR role');
  }
  if (!siteEditorRole) throw new Error('SITE_EDITOR_ROLE_MISSING');

  const editorPerms = allPerms.filter((p) =>
    (SITE_EDITOR_PERMISSION_CODES as readonly string[]).includes(p.code),
  );
  const existingEditorRp = await db
    .select()
    .from(rolePermissions)
    .where(eq(rolePermissions.roleId, siteEditorRole.id));
  const existingEditorPermIds = new Set(
    existingEditorRp.map((rp) => rp.permissionId),
  );
  for (const p of editorPerms) {
    if (existingEditorPermIds.has(p.id)) continue;
    await db.insert(rolePermissions).values({
      roleId: siteEditorRole.id,
      permissionId: p.id,
    });
  }

  let existingSettings = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.id, 1),
  });
  if (!existingSettings) {
    await db.insert(siteSettings).values({
      id: DEFAULT_SITE_SETTINGS.id,
      organizationId: defaultOrg.id,
      hero: DEFAULT_SITE_SETTINGS.hero,
      header: DEFAULT_SITE_SETTINGS.header,
      footer: DEFAULT_SITE_SETTINGS.footer,
      seo: DEFAULT_SITE_SETTINGS.seo,
      contactInfo: DEFAULT_SITE_SETTINGS.contactInfo,
      theme: DEFAULT_SITE_SETTINGS.theme,
      about: DEFAULT_SITE_SETTINGS.about,
    } as unknown as typeof siteSettings.$inferInsert);
    console.log('Created default site settings');
    existingSettings = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, 1),
    });
  }

  let viewerRole = await db.query.roles.findFirst({
    where: eq(roles.name, E2E_VIEWER_ROLE_NAME),
  });
  if (!viewerRole) {
    const [inserted] = await db.insert(roles).values({
      name: E2E_VIEWER_ROLE_NAME,
      description: 'E2E limited viewer — no dashboard or audit access',
    });
    viewerRole = await db.query.roles.findFirst({
      where: eq(roles.id, Number(inserted.insertId)),
    });
    console.log('Created E2E_VIEWER role');
  }
  if (!viewerRole) throw new Error('E2E_VIEWER_ROLE_MISSING');

  const viewerPerms = allPerms.filter((p) =>
    (E2E_VIEWER_PERMISSION_CODES as readonly string[]).includes(p.code),
  );
  const existingViewerRp = await db
    .select()
    .from(rolePermissions)
    .where(eq(rolePermissions.roleId, viewerRole.id));
  const existingViewerPermIds = new Set(
    existingViewerRp.map((rp) => rp.permissionId),
  );
  for (const p of viewerPerms) {
    if (existingViewerPermIds.has(p.id)) continue;
    await db.insert(rolePermissions).values({
      roleId: viewerRole.id,
      permissionId: p.id,
    });
  }

  let viewerUser = await db.query.users.findFirst({
    where: eq(users.email, VIEWER_EMAIL),
  });
  if (!viewerUser) {
    const passwordHash = await bcrypt.hash(VIEWER_PASSWORD, 12);
    const [inserted] = await db.insert(users).values({
      email: VIEWER_EMAIL,
      passwordHash,
      isActive: true,
      organizationId: defaultOrg.id,
    });
    viewerUser = await db.query.users.findFirst({
      where: eq(users.id, Number(inserted.insertId)),
    });
    console.log('Created viewer user:', VIEWER_EMAIL);
  }
  if (!viewerUser) throw new Error('VIEWER_USER_MISSING');

  const existingViewerUr = await db.query.userRoles.findFirst({
    where: and(
      eq(userRoles.userId, viewerUser.id),
      eq(userRoles.roleId, viewerRole.id),
    ),
  });
  if (!existingViewerUr) {
    await db.insert(userRoles).values({
      userId: viewerUser.id,
      roleId: viewerRole.id,
    });
  }

  await db
    .update(users)
    .set({ organizationId: defaultOrg.id })
    .where(isNull(users.organizationId));

  const allUsers = await db
    .select({ id: users.id, email: users.email })
    .from(users);
  for (const u of allUsers) {
    const memberRole = u.email === ADMIN_EMAIL ? 'owner' : 'member';
    OrganizationMembership.assertValidRole(memberRole);

    const existingMember = await db.query.organizationMembers.findFirst({
      where: and(
        eq(organizationMembers.organizationId, defaultOrg.id),
        eq(organizationMembers.userId, u.id),
      ),
    });
    if (!existingMember) {
      await db.insert(organizationMembers).values({
        organizationId: defaultOrg.id,
        userId: u.id,
        role: memberRole,
      });
    }
  }

  if (existingSettings && !existingSettings.organizationId) {
    await db
      .update(siteSettings)
      .set({ organizationId: defaultOrg.id })
      .where(eq(siteSettings.id, 1));
  }

  await pool.end();
  console.log('Seed completed.');
}

runSeed().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});
