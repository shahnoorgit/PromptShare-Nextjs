// next.config.js

const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  experimental: {
    prerender: true, // Enable prerendering
  },
  // Specify the output format for the prerender manifest
};

export default nextConfig;
