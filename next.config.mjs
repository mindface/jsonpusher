/** @type {import("next').NextConfig} */
const nextConfig = {
  turbopack: {},
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
