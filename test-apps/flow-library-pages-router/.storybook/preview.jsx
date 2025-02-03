/**
 * This file is used to configure storybook.
 * @file This file is saved as '.storybook/preview.jsx'.
 */
import '@arpitmalik832/next-js-rollup-flow-monorepo-library/styles/postcss-processed/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  ),
];
