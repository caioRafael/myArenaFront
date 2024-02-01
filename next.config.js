/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    ENVIROMENT: process.env.ENVIROMENT,
  },
}

module.exports = nextConfig
