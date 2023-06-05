CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_id" uuid NOT NULL,
	"is_approver" boolean DEFAULT false NOT NULL
);

ALTER TABLE "proposed" RENAME COLUMN "user_id" TO "discord_id";