// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
  nextTranslate({
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
    async headers() {
      return [
        {
          source: '/apple-app-site-association',
          headers: [
            {
              key: 'content-type',
              value: 'application/json',
            },
          ],
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/en/:path*',
          destination: '/:path*',
          locale: false,
        },
      ];
    },
  }),
);
