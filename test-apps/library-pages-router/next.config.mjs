/**
 * Webpack configuration file.
 * @file This file is saved as `webpack.config.js`.
 */
import { merge } from 'webpack-merge';

import commonConfig from './build_utils/next/configs/next.common.mjs';
// import federationConfig from './build_utils/webpack/configs/webpack.federation.mjs';
import bundleAnalyzerConfig from './build_utils/next/configs/next.bundleanalyzer.mjs';
import buildStatsConfig from './build_utils/next/configs/next.buildstats.mjs';

import {
  ERR_NO_APP_ENV_FLAG,
  ERR_NO_BE_ENV_FLAG,
} from './build_utils/config/logs.mjs';

/**
 * Adds additional configurations based on command line arguments.
 * @returns {Array} An array of additional webpack configurations.
 * @example
 * // To include federation and bundle analyzer configurations
 * // Run the command with federation bundleAnalyzer
 */
function addons() {
  // const addFederation = process.env.INCLUDE_FEDERATION === 'true';
  const addVisualizer = process.env.INCLUDE_VISUALIZER === 'true';
  const addBuildStats = process.env.INCLUDE_BUILD_STATS === 'true';

  const configs = [];
  // if (addFederation) configs.push(federationConfig);
  if (addVisualizer) configs.push(bundleAnalyzerConfig);
  if (addBuildStats) configs.push(buildStatsConfig);
  return configs;
}

/**
 * Generates the webpack configuration based on the environment.
 * @returns {object} The merged webpack configuration.
 * @throws {Error} If the APP_ENV environment variable is not set.
 * @example
 * // To generate the configuration for the development environment
 * process.env.APP_ENV = 'development';
 * const config = getConfig();
 */
function getConfig() {
  if (!(process.env.APP_ENV || process.env.STORY_ENV)) {
    throw new Error(ERR_NO_APP_ENV_FLAG);
  }
  if (!(process.env.BE_ENV || process.env.STORY_ENV)) {
    throw new Error(ERR_NO_BE_ENV_FLAG);
  }

  return merge(commonConfig, ...addons());
}

export default getConfig;
