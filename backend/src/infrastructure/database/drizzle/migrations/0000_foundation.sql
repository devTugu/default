CREATE TABLE "organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp(6) DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "UQ_organizations_slug" ON "organizations" USING btree ("slug");
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"isActive" boolean DEFAULT true NOT NULL,
	"oauth_provider" varchar(50),
	"oauth_subject" varchar(255),
	"mfa_enabled" boolean DEFAULT false NOT NULL,
	"mfa_secret_encrypted" text,
	"failed_login_attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp(6),
	"organization_id" integer,
	"created_at" timestamp(6) DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) DEFAULT now() NOT NULL,
	"deleted_at" timestamp(6)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "UQ_users_email" ON "users" USING btree ("email");
--> statement-breakpoint
CREATE INDEX "IDX_users_email" ON "users" USING btree ("email");
--> statement-breakpoint
CREATE UNIQUE INDEX "UQ_users_oauth" ON "users" USING btree ("oauth_provider","oauth_subject");
--> statement-breakpoint
CREATE INDEX "IDX_users_organization_id" ON "users" USING btree ("organization_id");
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"created_at" timestamp(6) DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) DEFAULT now() NOT NULL,
	"deleted_at" timestamp(6)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "UQ_roles_name" ON "roles" USING btree ("name");
--> statement-breakpoint
CREATE INDEX "IDX_roles_name" ON "roles" USING btree ("name");
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"description" varchar(255),
	"created_at" timestamp(6) DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "UQ_permissions_code" ON "permissions" USING btree ("code");
--> statement-breakpoint
CREATE INDEX "IDX_permissions_code" ON "permissions" USING btree ("code");
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"created_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "UQ_user_roles_user_role" ON "user_roles" USING btree ("user_id","role_id");
--> statement-breakpoint
CREATE INDEX "IDX_user_roles_user_id" ON "user_roles" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "IDX_user_roles_role_id" ON "user_roles" USING btree ("role_id");
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"permission_id" integer NOT NULL,
	"created_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "UQ_role_permissions_role_perm" ON "role_permissions" USING btree ("role_id","permission_id");
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token_hash" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"revoked_at" timestamp,
	"created_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "IDX_refresh_tokens_user_id" ON "refresh_tokens" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "IDX_refresh_tokens_token_hash" ON "refresh_tokens" USING btree ("token_hash");
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"organization_id" integer,
	"action" varchar(100) NOT NULL,
	"resource" varchar(100) NOT NULL,
	"resource_id" varchar(64),
	"ip_address" varchar(45),
	"metadata" jsonb,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX "IDX_audit_user_id" ON "audit_logs" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "IDX_audit_organization_id" ON "audit_logs" USING btree ("organization_id");
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" integer PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"hero" jsonb NOT NULL,
	"header" jsonb NOT NULL,
	"footer" jsonb NOT NULL,
	"seo" jsonb NOT NULL,
	"contact_info" jsonb NOT NULL,
	"theme" jsonb NOT NULL,
	"about" jsonb NOT NULL,
	"updated_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "IDX_site_settings_organization_id" ON "site_settings" USING btree ("organization_id");
--> statement-breakpoint
CREATE TABLE "organization_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"role" varchar(32) NOT NULL,
	"created_at" timestamp(6) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "UQ_organization_members_org_user" ON "organization_members" USING btree ("organization_id","user_id");
--> statement-breakpoint
CREATE INDEX "IDX_organization_members_org_id" ON "organization_members" USING btree ("organization_id");
--> statement-breakpoint
CREATE INDEX "IDX_organization_members_user_id" ON "organization_members" USING btree ("user_id");
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "FK_users_organization" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "FK_user_roles_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "FK_user_roles_role" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_role_permissions_role" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_role_permissions_permission" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_refresh_tokens_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_audit_logs_organization" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "site_settings" ADD CONSTRAINT "FK_site_settings_organization" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "FK_organization_members_org" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "FK_organization_members_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
