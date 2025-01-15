import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/_next/:path*', // Next.js 정적 파일
        destination: '/_next/:path*', // 그대로 전달
      },
      {
        source: '/static/:path*', // 정적 파일
        destination: '/static/:path*', // 그대로 전달
      },
      {
        source: '/favicon.ico', // 파비콘
        destination: '/favicon.ico', // 그대로 전달
      },
    ];
  },
};

export default nextConfig;
