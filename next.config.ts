import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Serve modern formats for smaller payloads
    formats: ["image/avif", "image/webp"],
    // Responsive breakpoints matching the design system
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Reduce quality slightly for bandwidth savings (Sanity CDN handles sharp originals)
    qualities: [60, 75, 85],
    // Keep optimised images in cache for 60 days
    minimumCacheTTL: 5184000,
  },
};

export default nextConfig;
