import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../app/env.mjs";
import * as schema from "@/db/schema";

const connectionString = env.DATABASE_URL;
const client = postgres(connectionString);

export const db = drizzle(client, {
  schema,
});
