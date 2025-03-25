import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/cakes",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/cakes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
