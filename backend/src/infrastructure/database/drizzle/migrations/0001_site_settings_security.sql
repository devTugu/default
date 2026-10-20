ALTER TABLE "site_settings" ADD COLUMN "security" jsonb DEFAULT '{"enforcePrivilegedMfa":false}'::jsonb NOT NULL;
