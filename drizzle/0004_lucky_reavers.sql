CREATE TABLE IF NOT EXISTS "proposed" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"tracker_match" uuid NOT NULL,
	"youtube_id" text NOT NULL,
	"user_id" uuid NOT NULL
);
