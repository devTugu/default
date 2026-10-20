ALTER TABLE "refresh_tokens" ADD COLUMN "user_agent" varchar(512);
ALTER TABLE "refresh_tokens" ADD COLUMN "ip_address" varchar(45);
ALTER TABLE "refresh_tokens" ADD COLUMN "last_seen_at" timestamp(6);

UPDATE "refresh_tokens" SET "last_seen_at" = "created_at" WHERE "last_seen_at" IS NULL;
