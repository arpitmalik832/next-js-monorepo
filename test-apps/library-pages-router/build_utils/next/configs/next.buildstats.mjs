/**
 * Webpack Build Stats configuration.
 * @file The file is saved as `build_utils/webpack/webpack.buildstats.mjs`.
 */
import { BuildStatsPlugin } from '../plugins/BuildStats.mjs';

const timestamp = new Date().toISOString().replace(/:/g, '-');
const path = `distInfo/${process.env.STORY_ENV ? 'storybook' : 'main'}/${process.env.STORY_ENV || process.env.APP_ENV}/buildStats`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    const newConfig = { ...config };

    newConfig.plugins.push(
      new BuildStatsPlugin({
        outputPath: `${path}/${timestamp}.json`,
      }),
    );

    return newConfig;
  },
};

export default nextConfig;
