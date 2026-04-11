import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // domínio secundário → principal (SEO redirect)
      {
        source: "/:path*",
        has: [{ type: "host", value: "tfconsultoriaambiental.com.br" }],
        destination: "https://www.tfambiental.com.br/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tfconsultoriaambiental.com.br" }],
        destination: "https://www.tfambiental.com.br/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qdnwdanewcihcahtzart.supabase.co",
      },
    ],
  },
};

export default nextConfig;
