/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable package import optimization for Chakra UI
    optimizePackageImports: ["@chakra-ui/react"],
    // Enable Turbopack for faster development builds (Next.js 13+)
    turbo: {
      rules: {
        "*.svg": ["@svgr/webpack"]
      }
    }
  },
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  // Optimize images with modern formats
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable gzip compression
  compress: true,
  // Enable React strict mode (good practice)
  reactStrictMode: true
}

module.exports = nextConfig
