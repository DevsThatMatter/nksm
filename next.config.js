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
      {
        protocol: "https",
        hostname: "pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev",
      },
    ],
  },
};

module.exports = nextConfig;
