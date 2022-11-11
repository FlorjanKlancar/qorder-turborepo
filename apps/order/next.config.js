/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["wallpapercave.com", "qordr.vercel.app", "imageproxy.wolt.com"],
  },
});


