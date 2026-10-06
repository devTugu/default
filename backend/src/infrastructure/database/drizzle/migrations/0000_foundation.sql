CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NULL,
  `isActive` tinyint NOT NULL DEFAULT 1,
  `oauth_provider` varchar(50) NULL,
  `oauth_subject` varchar(255) NULL,
  `mfa_enabled` tinyint NOT NULL DEFAULT 0,
  `mfa_secret_encrypted` text NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  UNIQUE KEY `UQ_users_email` (`email`),
  UNIQUE KEY `UQ_users_oauth` (`oauth_provider`, `oauth_subject`),
  KEY `IDX_users_email` (`email`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
--> statement-breakpoint
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) NULL DEFAULT NULL,
  UNIQUE KEY `UQ_roles_name` (`name`),
  KEY `IDX_roles_name` (`name`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
--> statement-breakpoint
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  UNIQUE KEY `UQ_permissions_code` (`code`),
  KEY `IDX_permissions_code` (`code`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
--> statement-breakpoint
CREATE TABLE `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  UNIQUE KEY `UQ_user_roles_user_role` (`user_id`, `role_id`),
  KEY `IDX_user_roles_user_id` (`user_id`),
  KEY `IDX_user_roles_role_id` (`role_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
--> statement-breakpoint
CREATE TABLE `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  UNIQUE KEY `UQ_role_permissions_role_perm` (`role_id`, `permission_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_role_permissions_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_role_permissions_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
--> statement-breakpoint
CREATE TABLE `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `revoked_at` timestamp NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  KEY `IDX_refresh_tokens_user_id` (`user_id`),
  KEY `IDX_refresh_tokens_token_hash` (`token_hash`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_refresh_tokens_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
--> statement-breakpoint
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL,
  `action` varchar(100) NOT NULL,
  `resource` varchar(100) NOT NULL,
  `resource_id` varchar(64) NULL,
  `ip_address` varchar(45) NULL,
  `metadata` json NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `IDX_audit_user_id` (`user_id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
--> statement-breakpoint
CREATE TABLE `site_settings` (
  `id` int NOT NULL,
  `hero` json NOT NULL,
  `header` json NOT NULL,
  `footer` json NOT NULL,
  `seo` json NOT NULL,
  `contact_info` json NOT NULL,
  `theme` json NOT NULL,
  `about` json NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
