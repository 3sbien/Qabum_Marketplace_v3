/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirige /api/auth/signin directo al proveedor de Google
      {
        source: '/api/auth/signin',
        destination: '/api/auth/signin/google',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
