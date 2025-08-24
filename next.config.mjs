/** @type {import("next').NextConfig} */
const nextConfig = {
  turbopack: {
    cacheDir: ".next/cache",
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 5000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**"],
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: ['@svgr/webpack'],
      // use: [
      //   {
      //     loader: '@svgr/webpack',
      //     options: {
      //       svgo: false, // 圧縮を無効にする設定
      //     },
      //   },
      // ],
    });
    return config;
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pagead2.googlesyndication.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
