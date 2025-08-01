import { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 86400,
    deviceSizes: [640, 1080, 1200],
    remotePatterns: [
      {
        hostname: "fdbllwtbkackirdugunj.supabase.co",
      },
      {
        hostname: "kxoneskwkgrjredodsfx.supabase.co",
      },
      {
        hostname: "cdlxkuzvjlyvwgzgcdro.supabase.co",
      },
      {
        hostname:"skkyjvdnikftxykbddoi.supabase.co"
      },
      {
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "mundo-tours.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "adviserholidays.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "april-tours.s3.me-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "placekitten.com",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "placekitten.com",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
};

module.exports = nextConfig;
