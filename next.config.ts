import { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
});

const nextConfig: NextConfig = {
  serverExternalPackages: ['@node-rs/argon2'],
};

export default withPWA(nextConfig);
