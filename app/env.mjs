import { createEnv } from "@t3-oss/env-nextjs";
import { string } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: string().url(),
    DISCORD_ID: string(),
    DISCORD_SECRET: string(),
    NEXTAUTH_SECRET: string(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DISCORD_SECRET: process.env.DISCORD_SECRET,
    DISCORD_ID: process.env.DISCORD_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
});
