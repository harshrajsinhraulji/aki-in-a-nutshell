/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['undici', 'firebase', 'firebase-admin'],
    },
    images: {
        domains: ["placehold.co", "firebasestorage.googleapis.com", "public.blob.vercel-storage.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.vercel-storage.com',
            },
        ],
    },
    // Simplified config for Next 14.2
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
    webpack: (config) => {
        config.resolve.fallback = { ...config.resolve.fallback, net: false, tls: false, fs: false };
        return config;
    },
};

export default nextConfig;
