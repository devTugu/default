import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { buildProductionContentSecurityPolicy } from './src/shared/config/production-csp';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

const isProduction = process.env.NODE_ENV === 'production';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'Content-Security-Policy',
          value: buildProductionContentSecurityPolicy(),
        },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      ]
    : []),
];

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: [
    '@default/ui',
    '@default/api',
    '@default/hooks',
    '@default/types',
    '@default/utils',
    '@default/design-tokens',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // Native CSS parser — must stay external (Turbopack cannot bundle .node binaries).
  serverExternalPackages: [
    'lightningcss',
    'lightningcss-darwin-arm64',
    'lightningcss-darwin-x64',
    'lightningcss-linux-arm64-gnu',
    'lightningcss-linux-arm64-musl',
    'lightningcss-linux-x64-gnu',
    'lightningcss-linux-x64-musl',
    'lightningcss-win32-x64-msvc',
    'lightningcss-win32-arm64-msvc',
    '@tailwindcss/node',
    '@tailwindcss/postcss',
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
