/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Enviar el endpoint viejo a la página "silenciosa" /signin
      {
        source: '/api/auth/signin',
        destination: '/signin',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
