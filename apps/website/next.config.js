const withPreconstruct = require('@preconstruct/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
};

module.exports = withPreconstruct(nextConfig);
