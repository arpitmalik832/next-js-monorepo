/**
 * Storybook configuration.
 * @file The file is saved as `.storybook/main.js`.
 */
import path from 'path';

/** @type { import('@storybook/nextjs').StorybookConfig } */
const storybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    'storybook-addon-render-modes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async config => {
    const newConfig = { ...config };
    if (newConfig.resolve) {
      newConfig.resolve.alias = {
        ...newConfig.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }
    return newConfig;
  },
};

export default storybookConfig;
