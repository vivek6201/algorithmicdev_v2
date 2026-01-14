import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      hostname: "d1s05seu32cxps.cloudfront.net"
    }]
  },
};

export default nextConfig;
