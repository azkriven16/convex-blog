import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "graceful-wildcat-365.convex.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "marvelous-chicken-698.convex.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
