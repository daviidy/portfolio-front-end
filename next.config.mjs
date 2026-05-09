/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isStaticExport = process.env.STATIC_EXPORT === 'true';
const nextConfig = {
  ...(isStaticExport && { output: 'export' }),
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
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
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'dev.to',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.educative.io',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.gcore.pro',
        port: '',
        pathname: '/**'
      }
    ],
  },
  assetPrefix: isProd ? 'https://david-yao.com/' : '',
  basePath: isProd ? '' : '',
  // output: 'export' enabled conditionally via STATIC_EXPORT=true env var (set in CI)
};

export default nextConfig;
