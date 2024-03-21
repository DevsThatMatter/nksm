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
        hostname: "pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev",
      },
    ],
  },
};

module.exports = nextConfig;
