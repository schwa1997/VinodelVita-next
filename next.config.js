/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other Next.js config options...
  server: {
    // Add leaflet to the list of includes
    includePackages: ["leaflet"],
  },
};

module.exports = nextConfig;
