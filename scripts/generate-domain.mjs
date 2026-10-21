#!/usr/bin/env node
/**
 * Scaffold a vertical domain: types → api → hooks → Drizzle + repository → dashboard route.
 *
 * Usage: node scripts/generate-domain.mjs --name announcements
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const idx = argv.indexOf("--name");
  if (idx === -1 || !argv[idx + 1]) {
    console.error("Usage: node scripts/generate-domain.mjs --name <kebab-case>");
    process.exit(1);
  }
  return argv[idx + 1].trim().toLowerCase();
}

function assertKebab(name) {
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
    console.error(`Invalid domain name "${name}". Use kebab-case (e.g. job-postings).`);
    process.exit(1);
  }
}

function toPascal(kebab) {
  return kebab
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function toCamel(kebab) {
  const pascal = toPascal(kebab);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toScreaming(kebab) {
  return kebab.replace(/-/g, "_").toUpperCase();
}

function toNavKey(kebab) {
  return kebab
    .split("-")
    .map((part, index) =>
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join("");
}

function toTitle(kebab) {
  return kebab
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function toSnakeTable(kebab) {
  return kebab.replace(/-/g, "_");
}

function tableVarName(kebab) {
  return toNavKey(kebab);
}

function writeFile(relPath, content) {
  const abs = path.join(ROOT, relPath);
  if (fs.existsSync(abs)) {
    console.error(`Refusing to overwrite ${relPath}`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  console.log(`Wrote ${relPath}`);
}

function patchJson(relPath, mutator) {
  const abs = path.join(ROOT, relPath);
  const json = JSON.parse(fs.readFileSync(abs, "utf8"));
  mutator(json);
  fs.writeFileSync(abs, `${JSON.stringify(json, null, 2)}\n`, "utf8");
  console.log(`Patched ${relPath}`);
}

function insertBeforeMarker(fileRel, marker, block) {
  const abs = path.join(ROOT, fileRel);
  let src = fs.readFileSync(abs, "utf8");
  const trimmed = block.trim();
  if (trimmed && src.includes(trimmed)) {
    console.log(`Skip ${fileRel} (already patched)`);
    return;
  }
  const insertAt = src.indexOf(marker);
  if (insertAt === -1) {
    console.error(`Marker not found in ${fileRel}: ${marker}`);
    process.exit(1);
  }
  src = `${src.slice(0, insertAt)}${block}\n${src.slice(insertAt)}`;
  fs.writeFileSync(abs, src, "utf8");
  console.log(`Patched ${fileRel}`);
}

function patchNavI18n(relPath, navKey, label) {
  const abs = path.join(ROOT, relPath);
  let src = fs.readFileSync(abs, "utf8");
  if (src.includes(`"${navKey}"`)) {
    console.log(`Skip ${relPath} nav.${navKey}`);
    return;
  }
  src = src.replace(
    `"siteSettings":`,
    `"${navKey}": "${label}",\n    "siteSettings":`,
  );
  fs.writeFileSync(abs, src, "utf8");
  console.log(`Patched ${relPath} nav.${navKey}`);
}

function scaffoldClientStack(ctx) {
  const { name, Pascal, camel, scream, importPath } = ctx;

  writeFile(
    `packages/types/src/${name}/schema.ts`,
    `import { z } from "zod";
import { PaginatedSchema } from "../common";

export const ${Pascal}Schema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
});

export type ${Pascal} = z.infer<typeof ${Pascal}Schema>;

export const ${Pascal}PageSchema = PaginatedSchema(${Pascal}Schema);
export type ${Pascal}Page = z.infer<typeof ${Pascal}PageSchema>;
`,
  );

  writeFile(
    `packages/types/src/${name}/index.ts`,
    `export {
  ${Pascal}Schema,
  ${Pascal}PageSchema,
  type ${Pascal},
  type ${Pascal}Page,
} from "./schema";
`,
  );

  patchJson("packages/types/package.json", (pkg) => {
    pkg.exports[`./${importPath}`] = {
      types: `./src/${name}/index.ts`,
      require: `./dist/${name}/index.js`,
      import: `./src/${name}/index.ts`,
      default: `./src/${name}/index.ts`,
    };
    pkg.typesVersions["*"][importPath] = [`./src/${name}/index.ts`];
  });

  writeFile(
    `packages/api/src/${name}/api.ts`,
    `import { ${Pascal}PageSchema, type ${Pascal} } from "@default/types/${importPath}";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";
import type { PaginatedResult } from "../types";

export async function list${Pascal}(): Promise<PaginatedResult<${Pascal}>> {
  const data = await getApi().get(API_ENDPOINTS.${scream}.LIST);
  return parseWith(${Pascal}PageSchema, API_ENDPOINTS.${scream}.LIST)(data);
}
`,
  );

  insertBeforeMarker(
    "packages/api/src/index.ts",
    'export * from "./audit-logs/api";',
    `export * from "./${name}/api";\n`,
  );

  insertBeforeMarker(
    "packages/api/src/index.ts",
    "  auditLogKeys,",
    `  ${camel}Keys,\n`,
  );

  insertBeforeMarker(
    "packages/api/src/endpoints.ts",
    "  AUDIT_LOGS: {",
    `  ${scream}: {
    LIST: "/admin/${name}",
  },
`,
  );

  insertBeforeMarker(
    "packages/api/src/query-keys.ts",
    "export const dashboardKeys = {",
    `export const ${camel}Keys = {
  all: ["${name}"] as const,
  lists: () => [...${camel}Keys.all, "list"] as const,
  list: () => [...${camel}Keys.lists()] as const,
};

`,
  );

  writeFile(
    `packages/hooks/src/${name}/use-${name}.ts`,
    `"use client";

import { useQuery } from "@tanstack/react-query";
import { ${camel}Keys, list${Pascal} } from "@default/api";

export { ${camel}Keys };

export function use${Pascal}List() {
  return useQuery({
    queryKey: ${camel}Keys.list(),
    queryFn: () => list${Pascal}(),
  });
}
`,
  );

  insertBeforeMarker(
    "packages/hooks/src/index.ts",
    "export {\n  siteSettingsKeys,",
    `export { ${camel}Keys, use${Pascal}List } from "./${name}/use-${name}";\n\n`,
  );
}

function scaffoldBackendStub(ctx) {
  const { name, Pascal, scream } = ctx;
  const perm = `${scream}_READ`;
  const repoToken = `${scream}_REPOSITORY`;
  const tableVar = tableVarName(name);
  const tableSql = toSnakeTable(name);

  insertBeforeMarker(
    "backend/src/infrastructure/database/seed/permissions.const.ts",
    "  'AUDIT_READ',",
    `  '${perm}',\n`,
  );

  insertBeforeMarker(
    "backend/src/shared/constants/tokens.ts",
    "export const AUDIT_LOG_REPOSITORY = Symbol('AUDIT_LOG_REPOSITORY');",
    `export const ${repoToken} = Symbol('${repoToken}');\n`,
  );

  insertBeforeMarker(
    "backend/src/infrastructure/database/drizzle/schema/index.ts",
    "export const organizations = pgTable(",
    `export { ${tableVar} } from './${name}.table';\n\n`,
  );

  insertBeforeMarker(
    "backend/src/infrastructure/database/drizzle/schema/index.ts",
    "  auditLogs,",
    `  ${tableVar},\n`,
  );

  writeFile(
    `backend/src/infrastructure/database/drizzle/schema/${name}.table.ts`,
    `import { index, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

/** Generated scaffold — run db:generate + migration:run after edits. */
export const ${tableVar} = pgTable(
  '${tableSql}',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    organizationId: integer('organization_id'),
    createdAt: timestamp('created_at', { mode: 'date', precision: 6 })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('IDX_${tableSql}_organization_id').on(table.organizationId),
  ],
);
`,
  );

  writeFile(
    `backend/src/application/ports/${name}.port.ts`,
    `import { PaginatedResult } from '@shared/types/pagination';

export interface ${Pascal}Entry {
  id: number;
  title: string;
  organizationId: number | null;
  createdAt: Date;
}

export interface List${Pascal}Query {
  page?: number;
  limit?: number;
  organizationId?: number;
}

export interface I${Pascal}Repository {
  findAll(query: List${Pascal}Query): Promise<PaginatedResult<${Pascal}Entry>>;
}
`,
  );

  writeFile(
    `backend/src/application/${name}/dto/${name}-output.mapper.ts`,
    `import { ${Pascal}Entry } from '@application/ports/${name}.port';

export interface ${Pascal}Output {
  id: number;
  title: string;
  createdAt: string;
}

export function to${Pascal}Output(entry: ${Pascal}Entry): ${Pascal}Output {
  return {
    id: entry.id,
    title: entry.title,
    createdAt: entry.createdAt.toISOString(),
  };
}
`,
  );

  writeFile(
    `backend/src/infrastructure/repositories/${name}.drizzle-repository.ts`,
    `import { Inject, Injectable } from '@nestjs/common';
import { and, count, desc, eq } from 'drizzle-orm';
import {
  ${Pascal}Entry,
  I${Pascal}Repository,
  List${Pascal}Query,
} from '@application/ports/${name}.port';
import { IOrganizationContext } from '@application/ports/organization-context.port';
import { ORGANIZATION_CONTEXT } from '@shared/constants/tokens';
import {
  DRIZZLE,
  type DrizzleDatabase,
} from '../database/drizzle/drizzle.tokens';
import { ${tableVar} } from '../database/drizzle/schema/${name}.table';

@Injectable()
export class ${Pascal}DrizzleRepository implements I${Pascal}Repository {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDatabase,
    @Inject(ORGANIZATION_CONTEXT)
    private readonly orgContext: IOrganizationContext,
  ) {}

  async findAll(query: List${Pascal}Query) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const filters = [];

    const orgId =
      query.organizationId ?? (await this.orgContext.getCurrentOrganizationId());
    if (orgId !== undefined && orgId !== null) {
      filters.push(eq(${tableVar}.organizationId, orgId));
    }

    const whereClause = filters.length ? and(...filters) : undefined;

    const [rows, totalRow] = await Promise.all([
      this.db
        .select()
        .from(${tableVar})
        .where(whereClause)
        .orderBy(desc(${tableVar}.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      this.db.select({ value: count() }).from(${tableVar}).where(whereClause),
    ]);

    const total = totalRow[0]?.value ?? 0;
    return {
      items: rows.map((row) => this.toEntry(row)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  private toEntry(row: typeof ${tableVar}.$inferSelect): ${Pascal}Entry {
    return {
      id: row.id,
      title: row.title,
      organizationId: row.organizationId,
      createdAt: row.createdAt,
    };
  }
}
`,
  );

  insertBeforeMarker(
    "backend/src/infrastructure/infrastructure.module.ts",
    "  AUDIT_LOG_REPOSITORY,",
    `  ${repoToken},\n`,
  );

  insertBeforeMarker(
    "backend/src/infrastructure/infrastructure.module.ts",
    "import { AuditLogDrizzleRepository } from './repositories/audit-log.drizzle-repository';",
    `import { ${Pascal}DrizzleRepository } from './repositories/${name}.drizzle-repository';\n`,
  );

  insertBeforeMarker(
    "backend/src/infrastructure/infrastructure.module.ts",
    "    { provide: AUDIT_LOG_REPOSITORY, useClass: AuditLogDrizzleRepository },",
    `    { provide: ${repoToken}, useClass: ${Pascal}DrizzleRepository },\n`,
  );

  writeFile(
    `backend/src/application/${name}/use-cases/list-${name}.use-case.ts`,
    `import { Inject, Injectable } from '@nestjs/common';
import {
  I${Pascal}Repository,
  List${Pascal}Query,
} from '@application/ports/${name}.port';
import { ${repoToken} } from '@shared/constants/tokens';
import { PaginatedResult } from '@shared/types/pagination';
import {
  ${Pascal}Output,
  to${Pascal}Output,
} from '../dto/${name}-output.mapper';

@Injectable()
export class List${Pascal}UseCase {
  constructor(
    @Inject(${repoToken})
    private readonly ${tableVar}: I${Pascal}Repository,
  ) {}

  async execute(
    query: List${Pascal}Query = {},
  ): Promise<PaginatedResult<${Pascal}Output>> {
    const result = await this.${tableVar}.findAll(query);
    return {
      ...result,
      items: result.items.map((item) => to${Pascal}Output(item)),
    };
  }
}
`,
  );

  writeFile(
    `backend/src/application/${name}/use-cases/list-${name}.use-case.spec.ts`,
    `import type { I${Pascal}Repository } from '@application/ports/${name}.port';
import { List${Pascal}UseCase } from './list-${name}.use-case';

describe('List${Pascal}UseCase', () => {
  it('maps repository rows to API output', async () => {
    const repo: I${Pascal}Repository = {
      findAll: jest.fn().mockResolvedValue({
        items: [
          {
            id: 1,
            title: 'Sample',
            organizationId: null,
            createdAt: new Date('2026-01-01T00:00:00.000Z'),
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      }),
    };

    const useCase = new List${Pascal}UseCase(repo);
    await expect(useCase.execute()).resolves.toEqual({
      items: [
        {
          id: 1,
          title: 'Sample',
          createdAt: '2026-01-01T00:00:00.000Z',
        },
      ],
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
    });
  });
});
`,
  );

  writeFile(
    `backend/src/presentation/http/controllers/v1/admin/${name}.controller.ts`,
    `import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { List${Pascal}UseCase } from '@application/${name}/use-cases/list-${name}.use-case';
import { Permissions } from '../../../decorators/permissions.decorator';

@ApiTags('${Pascal} (Admin) v1')
@ApiBearerAuth('access-token')
@Controller({ path: 'admin/${name}', version: '1' })
export class ${Pascal}AdminV1Controller {
  constructor(private readonly list${Pascal}: List${Pascal}UseCase) {}

  @Get()
  @Permissions('${perm}')
  @ApiOperation({ summary: 'List ${name}' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.list${Pascal}.execute({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }
}
`,
  );

  writeFile(
    `backend/src/presentation/http/modules/${name}.presentation.module.ts`,
    `import { Module } from '@nestjs/common';
import { ${Pascal}AdminV1Controller } from '../controllers/v1/admin/${name}.controller';
import { List${Pascal}UseCase } from '@application/${name}/use-cases/list-${name}.use-case';

@Module({
  controllers: [${Pascal}AdminV1Controller],
  providers: [List${Pascal}UseCase],
})
export class ${Pascal}PresentationModule {}
`,
  );

  insertBeforeMarker(
    "backend/src/app.module.ts",
    "import { AuditPresentationModule }",
    `import { ${Pascal}PresentationModule } from '@presentation/http/modules/${name}.presentation.module';\n`,
  );

  insertBeforeMarker(
    "backend/src/app.module.ts",
    "    AuditPresentationModule,",
    `    ${Pascal}PresentationModule,\n`,
  );
}

function scaffoldFrontendStub(ctx) {
  const { name, Pascal, scream, navKey, title } = ctx;
  const perm = `${scream}_READ`;
  const routeKey = scream;

  insertBeforeMarker(
    "frontend/src/shared/config/permissions.ts",
    "  AUDIT_READ: 'AUDIT_READ',",
    `  ${perm}: '${perm}',\n`,
  );

  insertBeforeMarker(
    "frontend/src/shared/config/routes.ts",
    "  AUDIT_LOGS: '/dashboard/audit-logs',",
    `  ${routeKey}: '/dashboard/${name}',\n`,
  );

  insertBeforeMarker(
    "frontend/src/shared/config/bff-allowlist.ts",
    "  { path: '/admin/audit-logs', methods: ['GET'] },",
    `  { path: '/admin/${name}', methods: ['GET'] },\n`,
  );

  patchNavI18n("frontend/src/shared/i18n/messages/en.json", navKey, title);
  patchNavI18n("frontend/src/shared/i18n/messages/mn.json", navKey, title);

  insertBeforeMarker(
    "frontend/src/widgets/app-sidebar/app-sidebar.tsx",
    "import { LayoutDashboard, Settings, Shield } from 'lucide-react';",
    "import { FileText, LayoutDashboard, Settings, Shield } from 'lucide-react';",
  );

  insertBeforeMarker(
    "frontend/src/widgets/app-sidebar/app-sidebar.tsx",
    `  {
    titleKey: 'siteSettings',
    href: ROUTES.SITE_SETTINGS,
    icon: Settings,
    permission: PERMISSION_CODES.SITE_SETTING_READ,
  },
`,
    `  {
    titleKey: '${navKey}',
    href: ROUTES.${routeKey},
    icon: FileText,
    permission: PERMISSION_CODES.${perm},
  },
`,
  );

  writeFile(
    `frontend/src/features/${name}/ui/${name}-list-view.tsx`,
    `'use client';

import { use${Pascal}List } from '@default/hooks';
import { DataTableQueryState } from '@/shared/ui/data-table/data-table-query-state';

export function ${Pascal}ListView() {
  const { data, isLoading, isError, error, refetch } = use${Pascal}List();

  const count = data?.items.length ?? 0;

  return (
    <DataTableQueryState isError={isError} error={error} refetch={refetch}>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">${title}</h1>
        <p className="text-muted-foreground text-sm">
          Scaffold route — wire Drizzle + UI, then replace this placeholder.
        </p>
        {isLoading ? null : <p className="text-sm">{count} item(s)</p>}
      </div>
    </DataTableQueryState>
  );
}
`,
  );

  writeFile(
    `frontend/src/features/${name}/index.ts`,
    `export { ${Pascal}ListView } from './ui/${name}-list-view';
`,
  );

  writeFile(
    `frontend/app/dashboard/${name}/page.tsx`,
    `import { RequirePermission } from '@/features/auth';
import { ${Pascal}ListView } from '@/features/${name}';
import { PERMISSION_CODES } from '@/shared/config/permissions';

export default function ${Pascal}Page() {
  return (
    <RequirePermission permission={PERMISSION_CODES.${perm}}>
      <${Pascal}ListView />
    </RequirePermission>
  );
}
`,
  );

  writeFile(
    `frontend/src/features/${name}/README.md`,
    `# ${Pascal} (generated scaffold)

Generated stack through Drizzle repository (\`GET /api/v1/admin/${name}\`).

Next:

1. \`pnpm --filter backend run db:generate\` then \`pnpm --filter backend run migration:run\`
2. \`pnpm --filter backend run seed\` (new \`${perm}\` permission)
3. Extend \`${name}.table.ts\`, port, and admin UI (table, forms)
4. \`pnpm quality\`

See \`md/fork.md\`.
`,
  );
}

function main() {
  const name = parseArgs(process.argv);
  assertKebab(name);
  const ctx = {
    name,
    Pascal: toPascal(name),
    camel: toCamel(name),
    scream: toScreaming(name),
    importPath: name,
    navKey: toNavKey(name),
    title: toTitle(name),
  };

  scaffoldClientStack(ctx);
  scaffoldBackendStub(ctx);
  scaffoldFrontendStub(ctx);

  console.log(
    `\nScaffolded "${name}". Run: pnpm --filter backend db:generate && pnpm --filter backend migration:run && pnpm --filter backend seed`,
  );
}

main();
