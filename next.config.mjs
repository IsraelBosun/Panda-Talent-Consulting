/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        // Port and pathname can often be omitted or set to '/**' for simplicity with placeholder services
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;










// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;
