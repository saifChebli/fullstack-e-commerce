import createNextIntlPlugin from 'next-intl/plugin'

const nextIntl = createNextIntlPlugin("./src/i18n/request.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default nextIntl(nextConfig);
