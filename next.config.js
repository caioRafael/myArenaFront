/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    COPY_URL: process.env.COPY_URL,
  },
}

module.exports = nextConfig
