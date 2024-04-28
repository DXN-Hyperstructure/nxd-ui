/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
