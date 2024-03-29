import nextTranslate from "next-translate";

// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: false, // true results in a bug in prod: https://github.com/vercel/next.js/issues/36221
  images: {
    // domains: ["sportsconnect-profilephotos.s3.amazonaws.com"],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  experimental: {
    scrollRestoration: true,
  },
  ...nextTranslate(),
};
export default config;
