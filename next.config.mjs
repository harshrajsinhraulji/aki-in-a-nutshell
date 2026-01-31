/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["placehold.co", "firebasestorage.googleapis.com", "public.blob.vercel-storage.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.vercel-storage.com',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = { ...config.resolve.fallback, net: false, tls: false, fs: false };
        return config;
    },
};

export default nextConfig;

