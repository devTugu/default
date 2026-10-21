import * as bcrypt from 'bcrypt';
import { and, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  permissions,
  rolePermissions,
  roles,
  schema,
  userRoles,
  users,
} from '../drizzle/schema';
import {
  E2E_VIEWER_PERMISSION_CODES,
  E2E_VIEWER_ROLE_NAME,
} from './permissions.const';

type SeedDb = NodePgDatabase<typeof schema>;

export async function seedE2eViewerUser(
  db: SeedDb,
  input: {
    organizationId: number;
    viewerEmail: string;
    viewerPassword: string;
  },
): Promise<void> {
  let viewerRole = await db.query.roles.findFirst({
    where: eq(roles.name, E2E_VIEWER_ROLE_NAME),
  });
  if (!viewerRole) {
    const [inserted] = await db
      .insert(roles)
      .values({
        name: E2E_VIEWER_ROLE_NAME,
        description: 'E2E limited viewer — no dashboard or audit access',
      })
      .returning();
    viewerRole = inserted;
    console.log('Created E2E_VIEWER role');
  }
  if (!viewerRole) throw new Error('E2E_VIEWER_ROLE_MISSING');

  const allPerms = await db.select().from(permissions);
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
    where: eq(users.email, input.viewerEmail),
  });
  if (!viewerUser) {
    const passwordHash = await bcrypt.hash(input.viewerPassword, 12);
    const [inserted] = await db
      .insert(users)
      .values({
        email: input.viewerEmail,
        passwordHash,
        isActive: true,
        organizationId: input.organizationId,
      })
      .returning();
    viewerUser = inserted;
    console.log('Created viewer user:', input.viewerEmail);
  }
  if (!viewerUser) throw new Error('E2E_VIEWER_USER_MISSING');

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
}
