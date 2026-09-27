/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // リポジトリ直下にも Playwright 用の lockfile があるため、frontend を基準に固定する
    root: import.meta.dirname,
  },
};

export default nextConfig;
