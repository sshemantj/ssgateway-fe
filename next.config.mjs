/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    customKey: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
