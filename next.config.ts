import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is pre-rendered, so the build is a folder of static files
  // (`out/`) that any static host can serve: Cloudflare Pages in production.
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
