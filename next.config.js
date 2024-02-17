/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "utfs.io",
           "example.com"
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
            },
        ],
    }
}

module.exports = nextConfig;
