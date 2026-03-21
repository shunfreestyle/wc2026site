import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hbb.afl.rakuten.co.jp" },
      { protocol: "https", hostname: "hb.afl.rakuten.co.jp" },
      { protocol: "https", hostname: "thumbnail.image.rakuten.co.jp" },
    ],
  },
};

export default nextConfig;
