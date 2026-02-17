import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        pathname: '/icon/**',
      },
    ],
    // cache optimized images for 1 hour in browser
    minimumCacheTTL: 3600,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 1080, 1200],
    imageSizes: [32, 48, 64, 96],
  },
};

export default nextConfig;
