-- Phase 2: login lockout columns
ALTER TABLE `users`
  ADD COLUMN `failed_login_attempts` int NOT NULL DEFAULT 0,
  ADD COLUMN `locked_until` datetime(6) NULL DEFAULT NULL;
--> statement-breakpoint
-- Phase 3: tenancy-ready schema (single default org; multi-org UI out of scope)
CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  UNIQUE KEY `UQ_organizations_slug` (`slug`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
--> statement-breakpoint
CREATE TABLE `organization_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_id` int NOT NULL,
  `user_id` int NOT NULL,
  `role` varchar(32) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  UNIQUE KEY `UQ_organization_members_org_user` (`organization_id`, `user_id`),
  KEY `IDX_organization_members_org_id` (`organization_id`),
  KEY `IDX_organization_members_user_id` (`user_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_organization_members_org` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_organization_members_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
--> statement-breakpoint
ALTER TABLE `users`
  ADD COLUMN `organization_id` int NULL DEFAULT NULL,
  ADD KEY `IDX_users_organization_id` (`organization_id`),
  ADD CONSTRAINT `FK_users_organization` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE `site_settings`
  ADD COLUMN `organization_id` int NULL DEFAULT NULL,
  ADD KEY `IDX_site_settings_organization_id` (`organization_id`),
  ADD CONSTRAINT `FK_site_settings_organization` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE `audit_logs`
  ADD COLUMN `organization_id` int NULL DEFAULT NULL,
  ADD KEY `IDX_audit_organization_id` (`organization_id`),
  ADD CONSTRAINT `FK_audit_logs_organization` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE SET NULL;
