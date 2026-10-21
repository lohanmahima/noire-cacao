import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === 'gh-pages';
const basePath = isGithubPages ? '/noire-cacao' : '';

const nextConfig: NextConfig = {
  /* config options here */
  output: isGithubPages ? 'export' : undefined,
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  cacheComponents: isGithubPages ? undefined : true,
  partialPrefetching: isGithubPages ? undefined : true,
  allowedDevOrigins: ['*.lhr.life', '8ea61dd3789be2.lhr.life'],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
