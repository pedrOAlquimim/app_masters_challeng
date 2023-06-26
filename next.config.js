/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'api.ts'],
  images: {
    domains: ['www.freetogame.com'],
  },
}

module.exports = nextConfig
