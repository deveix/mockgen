import { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable static exports if needed for better SEO
  // output: 'export',

  // Enable image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compress pages for better performance
  compress: true,

  // Enable experimental features for better SEO
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
    ],
  },
   webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    return config;
  },
  // Remove console logs in production except errors
  compiler: process.env.NODE_ENV === 'production' ? {
    removeConsole: {
      exclude: ['error'],
    },
  } : {},

  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ]
  },

  // Redirects for SEO (add any old URLs you want to redirect)
  async redirects() {
    return [
      // Example: redirect old paths to new ones
      // {
      //   source: '/old-path',
      //   destination: '/',
      //   permanent: true,
      // },
    ]
  },
}

export default nextConfig
