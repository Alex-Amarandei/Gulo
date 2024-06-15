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
    POLYGON_API_KEY: process.env.POLYGON_API_KEY,
    CMC_API_KEY: process.env.CMC_API_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    S3_REGION: process.env.S3_REGION,
  },
};
