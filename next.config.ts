import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  generateStaticParams: true,
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
