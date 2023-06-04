import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "../app/env.mjs";
import * as schema from "@/db/schema";

const migrationClient = postgres(env.DATABASE_URL, { max: 1 });

migrate(drizzle(migrationClient), {
  migrationsFolder: "./drizzle",
}).then(() => console.log("Migrations complete!"));

const connectionString = env.DATABASE_URL;
const client = postgres(connectionString);

export const db = drizzle(client, {
  schema,
});
