DO $$ BEGIN
 CREATE TYPE "rank" AS ENUM('iron', 'silver', 'gold', 'platinum', 'diamond', 'immortal', 'radiant');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
