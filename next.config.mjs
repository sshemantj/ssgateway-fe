/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/configpanel",
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
