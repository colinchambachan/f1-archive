/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagsapi.com", "media-2.api-sports.io"], // hostname of the img url
  },
  env: {
    F1_API_KEY: process.env.F1_API_KEY,
  },
};

module.exports = nextConfig;
