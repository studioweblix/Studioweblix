/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840, 4096, 7680],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nwbpkbkcaipstswsdtaa.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
