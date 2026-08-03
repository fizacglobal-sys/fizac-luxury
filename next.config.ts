/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://your-backend-server.com*', // Change to your actual backend URL
      },
    ];
  },
};

module.exports = nextConfig;