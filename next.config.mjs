/** @type {import("next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 5000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**"],
      };
    }
    return config;
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pagead2.googlesyndication.com"
    ],
  },
};

export default nextConfig;
