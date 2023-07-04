/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagsapi.com", "media-2.api-sports.io"], // hostname of the img url
  },
};

module.exports = nextConfig;
