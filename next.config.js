/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Disable SWC minifier since we're in WebContainer
  swcMinify: false,
  // Use Babel instead of SWC
  experimental: {
    forceSwcTransforms: false
  }
}

module.exports = nextConfig