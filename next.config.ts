import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "images.unsplash.com"],
  },
  devIndicators: false,
};

export default nextConfig;
