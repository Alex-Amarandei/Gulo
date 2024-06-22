/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    externalDir: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

require('dotenv').config();

module.exports = {
  ...nextConfig,
  env: {
    LAMBDA_ENDPOINT: process.env.LAMBDA_ENDPOINT,
    API_GATEWAY_ENDPOINT: process.env.API_GATEWAY_ENDPOINT,
  },
};
