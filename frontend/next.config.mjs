/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 同じ LAN の他の端末から開発サーバーを開けるようにする(Windows の Wi-Fi と有線 LAN の IP)
  // windows の場合、`ipconfig` で確認できる IPv4 アドレスを指定する
  // wsl の場合、`hostname -I` or `ip addr` で確認できる IPv4 アドレスを指定する
  // mac の場合、`ifconfig` で確認できる IPv4 アドレスを指定する
  allowedDevOrigins: ['192.168.1.6', '192.168.1.10'],
  turbopack: {
    // リポジトリ直下にも Playwright 用の lockfile があるため、frontend を基準に固定する
    root: import.meta.dirname,
  },
};

export default nextConfig;
