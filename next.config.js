/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "b95aa74fb195a3cf6ee2a262fda80375.r2.cloudflarestorage.com",
      },
    ],
  },
};

module.exports = nextConfig;
