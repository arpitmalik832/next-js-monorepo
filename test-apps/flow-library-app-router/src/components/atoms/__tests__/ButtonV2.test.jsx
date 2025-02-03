/**
 * Unit tests for Button component.
 * @file This file is saved as `Button.test.jsx`.
 */
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ReduxProvider,
  slices,
} from '@arpitmalik832/next-js-rollup-flow-monorepo-library';
import { configureStore } from '@reduxjs/toolkit';

import Component from '../ButtonV2';

describe('Button unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  const store = configureStore({
    reducer: {
      app: slices.appSlice.reducer,
    },
  });

  test('Button snapshot test', () => {
    const component = render(
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('Button renders correctly', () => {
    const { getByTestId } = render(
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>,
    );

    expect(getByTestId('button')).toHaveTextContent('Button');
    fireEvent.click(getByTestId('button'));
  });
});
