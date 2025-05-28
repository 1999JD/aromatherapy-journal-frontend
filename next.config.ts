import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_HOST}/api/:path*`,
      },
    ];
  },
  env: {
    API_BASE_PATH: process.env.API_BASE_PATH,
  },
};

export default nextConfig;
