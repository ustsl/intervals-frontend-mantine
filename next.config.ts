import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CRYPTO_KEY: process.env.CRYPTO_KEY,
    AIHANDLER_SECRET_KEY: process.env.AIHANDLER_SECRET_KEY,
    AIHANDLER_PROMPT: process.env.AIHANDLER_PROMPT
  },
};

export default nextConfig;
