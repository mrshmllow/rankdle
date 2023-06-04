import "./app/env.mjs";
import migrate from "./db/migrate.mjs";

let migrated = false;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer && !migrated) {
      migrate();
      migrated = true;
    }

    return config;
  },
};

export default nextConfig;
