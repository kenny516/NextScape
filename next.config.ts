import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["ferf1mheo22r9ira.public.blob.vercel-storage.com", "https://lh3.googleusercontent.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ]
    },
};

export default nextConfig;
