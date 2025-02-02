/**
 * Webpack Bundle Analyzer configuration.
 * @file The file is saved as `build_utils/webpack/webpack.bundleanalyzer.js`.
 */
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { resolve } from 'path';

const timestamp = new Date().toISOString().replace(/:/g, '-');
const path = `distInfo/${process.env.STORY_ENV ? 'storybook' : 'main'}/${process.env.STORY_ENV || process.env.APP_ENV}/visualizers/${timestamp}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    const newConfig = { ...config };

    newConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static', // Generate static HTML files
        reportFilename: resolve(path, `${timestamp}.html`), // Specify the output file name
        openAnalyzer: false, // Do not automatically open the report in the browser
      }),
    );

    return newConfig;
  },
};

export default nextConfig;
