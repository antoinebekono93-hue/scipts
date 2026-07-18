/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'imgix.cosmicjs.com' },
      { protocol: 'https', hostname: 'cosmic-s3.imgix.net' },
    ],
  },
}

module.exports = nextConfig
