const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    ppr: true,
  },
  reactStrictMode: false,
  images: {
    domains: ["https://cdn.sailracing.com"],
    minimumCacheTTL: 3000,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  output: "standalone",
};

export default nextConfig;
