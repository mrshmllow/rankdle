CREATE TABLE IF NOT EXISTS "daily_rankdle_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"rankdle_id" integer,
	"shown_date" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "guesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"rank" rank NOT NULL,
	"clip_id" integer
);

CREATE TABLE IF NOT EXISTS "rankdles" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"tracker_match" uuid NOT NULL,
	"youtube_id" text NOT NULL,
	"rank" rank NOT NULL,
	"val_id" text NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "daily_rankdle_log" ADD CONSTRAINT "daily_rankdle_log_rankdle_id_rankdles_id_fk" FOREIGN KEY ("rankdle_id") REFERENCES "rankdles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "guesses" ADD CONSTRAINT "guesses_clip_id_rankdles_id_fk" FOREIGN KEY ("clip_id") REFERENCES "rankdles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
