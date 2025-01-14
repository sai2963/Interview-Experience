/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' since we're using API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;