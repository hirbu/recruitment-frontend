import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
          "/api/:path*",
      },
      {
        source: "/login",
        destination:
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
          "/login",
      },
      {
        source: "/register",
        destination:
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
          "/register",
      },
      {
        source: "/logout",
        destination:
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
          "/logout",
      },
      {
        source: "/me",
        destination:
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/me",
      },
    ];
  },
};

export default nextConfig;
