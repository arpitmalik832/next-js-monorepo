/**
 * Next.js configuration for the application.
 * @file This file is saved as next.config.js.
 */
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import { fileURLToPath } from 'url';
import { InjectManifest } from 'workbox-webpack-plugin';

import { StripCustomWindowVariablesPlugin } from '../plugins/StripCustomWindowVariables.mjs';
import svgrConfig from '../../../svgr.config.mjs';
import { ENVS } from '../../config/index.mjs';
import pkg from '../../../package.json' with { type: 'json' };

const filename = fileURLToPath(import.meta.url);

const isRelease = process.env.APP_ENV === ENVS.PROD;
const isBeta = process.env.APP_ENV === ENVS.BETA;
const isStg = process.env.APP_ENV === ENVS.STG;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: isRelease,
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    BE_ENV: process.env.BE_ENV,
  },
  webpack: config => {
    const newConfig = { ...config };

    newConfig.cache = {
      type: 'filesystem',
      version: `${pkg.version}_${process.env.APP_ENV}`,
      store: 'pack',
      buildDependencies: {
        config: [filename],
      },
    };

    newConfig.devtool = isRelease || isBeta ? false : 'source-map';

    newConfig.performance = {
      hints: isRelease || isBeta ? 'error' : 'warning',
      maxAssetSize: 250000,
      maxEntrypointSize: 10000000,
    };

    newConfig.optimization = {
      minimize: isRelease || isBeta,
      minimizer:
        isRelease || isBeta
          ? [
              new TerserPlugin({
                terserOptions: {
                  compress: {
                    inline: false,
                    drop_console: isRelease,
                    dead_code: true,
                    drop_debugger: isRelease,
                    conditionals: true,
                    evaluate: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    hoist_funs: true,
                    keep_fargs: false,
                    hoist_vars: true,
                    if_return: true,
                    join_vars: true,
                    side_effects: true,
                  },
                  mangle: true,
                  output: {
                    comments: false,
                  },
                },
              }),
            ]
          : [],
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxSize: 200 * 1024, // 200 KB
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const moduleName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
              )?.[1];
              if (moduleName) {
                return `vendor-${moduleName}`;
              }
              return 'vendor';
            },
            chunks: 'all',
            priority: -10,
            reuseExistingChunk: true,
            enforce: true,
            maxInitialRequests: 30,
            maxAsyncRequests: 30,
          },
        },
      },
      sideEffects: true,
    };

    newConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
      }),
      new Dotenv({
        path: `./.env.${process.env.BE_ENV}`,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'public/netlify',
          },
        ],
      }),
      (isStg || isBeta || isRelease) &&
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css)$/,
        }),
      (isBeta || isRelease) &&
        new StripCustomWindowVariablesPlugin({ variables: ['abc'] }),
      new InjectManifest({
        swDest: `sw.js`,
        swSrc: './src/services/sw.js',
        exclude: [/asset-manifest\.json$/, /\.gz$/, /src\/assets\//],
        chunks: [],
      }),
    );

    newConfig.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: svgrConfig,
        },
        'url-loader',
      ],
    });

    return newConfig;
  },
};

export default nextConfig;
