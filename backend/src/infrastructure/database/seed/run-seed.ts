import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { and, eq, isNull } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { OrganizationMembership } from '@domain/organization/entities/organization-membership.entity';
import { DEFAULT_SITE_SETTINGS } from '@domain/site-setting/entities/site-settings.entity';
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
  PERMISSION_CODES,
  SITE_EDITOR_PERMISSION_CODES,
  SITE_EDITOR_ROLE_NAME,
  SUPER_ADMIN_ROLE_NAME,
} from './permissions.const';
import { seedE2eViewerUser } from './e2e-viewer.seed';

dotenv.config({ path: '.env' });

const useSsl = process.env.DB_SSL === 'true';

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@default.mn';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'admin123!';
const VIEWER_EMAIL = process.env.SEED_VIEWER_EMAIL ?? 'viewer@default.mn';
const VIEWER_PASSWORD = process.env.SEED_VIEWER_PASSWORD ?? 'viewer123!';
const DEFAULT_ORG_SLUG = process.env.ORGANIZATION_DEFAULT_SLUG ?? 'default';

async function runSeed(): Promise<void> {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 2,
    connectionTimeoutMillis: 15_000,
    ...(useSsl && { ssl: { rejectUnauthorized: true } }),
  });

  const db = drizzle(pool, { schema });

  let defaultOrg = await db.query.organizations.findFirst({
    where: eq(organizations.slug, DEFAULT_ORG_SLUG),
  });
  if (!defaultOrg) {
    const [inserted] = await db
      .insert(organizations)
      .values({
        slug: DEFAULT_ORG_SLUG,
        name: 'Default',
      })
      .returning();
    defaultOrg = inserted;
    console.log('Created default organization:', DEFAULT_ORG_SLUG);
  }
  if (!defaultOrg) throw new Error('DEFAULT_ORGANIZATION_MISSING');

  let superAdminRole = await db.query.roles.findFirst({
    where: eq(roles.name, SUPER_ADMIN_ROLE_NAME),
  });
  if (!superAdminRole) {
    const [inserted] = await db
      .insert(roles)
      .values({
        name: SUPER_ADMIN_ROLE_NAME,
        description: 'Super administrator with all permissions',
      })
      .returning();
    superAdminRole = inserted;
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
    const [inserted] = await db
      .insert(users)
      .values({
        email: ADMIN_EMAIL,
        passwordHash,
        isActive: true,
        organizationId: defaultOrg.id,
      })
      .returning();
    adminUser = inserted;
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
    const [inserted] = await db
      .insert(roles)
      .values({
        name: SITE_EDITOR_ROLE_NAME,
        description: 'Website content editor (site settings)',
      })
      .returning();
    siteEditorRole = inserted;
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
      security: DEFAULT_SITE_SETTINGS.security,
    } as unknown as typeof siteSettings.$inferInsert);
    console.log('Created default site settings');
    existingSettings = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, 1),
    });
  }

  await seedE2eViewerUser(db, {
    organizationId: defaultOrg.id,
    viewerEmail: VIEWER_EMAIL,
    viewerPassword: VIEWER_PASSWORD,
  });

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
