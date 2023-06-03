ALTER TYPE "rank" ADD VALUE 'bronze';
ALTER TYPE "rank" ADD VALUE 'ascendant';
DROP TABLE "daily_rankdle_log";
ALTER TABLE "rankdles" ADD COLUMN "shown_date" date;