const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  output: "standalone",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    return config;
  },
  experimental: {
    outputFileTracingExcludes: {
      "/register": ["**canvas**"],
      "/dashboard": ["**canvas**"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inprostore.vercel.app",
      },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "veterinaire-tour-hassan.com" },
      { protocol: "https", hostname: "tailwindui.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
