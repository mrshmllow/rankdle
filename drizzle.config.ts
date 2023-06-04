import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./db/schema.ts",
  connectionString: process.env.DATABASE_URL,
  out: "./drizzle",
} satisfies Config;
