import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CRYPTO_KEY: process.env.CRYPTO_KEY,
  },
};

export default nextConfig;
