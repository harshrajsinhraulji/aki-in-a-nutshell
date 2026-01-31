import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.vercel-storage.com",
            },
            {
                protocol: "https",
                hostname: "**.public.blob.vercel-storage.com",
            },
        ],
    },
    // Transpile Three.js packages for SSR compatibility
    transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
    // Webpack config for Three.js
    webpack: (config) => {
        config.externals = config.externals || [];
        return config;
    },
};

export default nextConfig;
