/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tothenew.com',
        port: '',
        pathname: '/blog/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.gcore.pro',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'educative.io',
        port: '',
        pathname: '/**'
      }
    ],
  },
};

export default nextConfig;
