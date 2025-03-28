import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://localhost:8000",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL + "/api/:path*",
      },
      {
        source: "/login",
        destination: process.env.NEXT_PUBLIC_API_URL + "/login",
      },
      {
        source: "/register",
        destination: process.env.NEXT_PUBLIC_API_URL + "/register",
      },
      {
        source: "/logout",
        destination: process.env.NEXT_PUBLIC_API_URL + "/logout",
      },
      {
        source: "/me",
        destination: process.env.NEXT_PUBLIC_API_URL + "/me",
      },
    ];
  },
};

export default nextConfig;
