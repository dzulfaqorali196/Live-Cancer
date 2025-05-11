/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['ajv', 'json-schema-traverse', 'fast-deep-equal', 'uri-js'],
  webpack: (config, { isServer }) => {
    // Mengabaikan masalah lightningcss.node dan menambahkan penanganan ajv
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        path: false,
        os: false,
        crypto: false,
      };
    }

    // Memastikan semua subdirektori dari ajv di-resolve dengan benar
    config.resolve.alias = {
      ...config.resolve.alias,
      'ajv/dist/compile/codegen': path.resolve(__dirname, './lib/ajv/codegen.js'),
      'ajv/dist/compile/resolve': path.join(__dirname, 'node_modules/ajv/dist/compile/resolve/index.js'),
      'ajv/dist/runtime/validation_error': path.join(__dirname, 'node_modules/ajv/dist/runtime/validation_error.js'),
    };

    // Gunakan babel-loader untuk js/ts files
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });

    return config;
  },
  env: {
    AUTH_FACEBOOK_ID: process.env.AUTH_FACEBOOK_ID,
    AUTH_FACEBOOK_SECRET: process.env.AUTH_FACEBOOK_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_TWITTER_ID: process.env.AUTH_TWITTER_ID,
    AUTH_TWITTER_SECRET: process.env.AUTH_TWITTER_SECRET,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_SECURE: process.env.EMAIL_SECURE,
    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_TO: process.env.EMAIL_TO,
    EMAIL_USER: process.env.EMAIL_USER,
    HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT,
    HASURA_SECRET: process.env.HASURA_SECRET,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
  },
};

module.exports = nextConfig;
