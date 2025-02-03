'use client';

/**
 * This provider is used to wrap the application with all the necessary Providers.
 * @file This file is saved as `providers/AppProvider.jsx`.
 */
import { ReduxProvider } from '@arpitmalik832/next-js-rollup-flow-monorepo-library';

import App from './App';
import PageWrapper from './HOC/PageWrapper';
import getStore from './redux/store/store';

/**
 * AppWrapper component that wraps the application with ReduxProvider.
 * @param {import('react').ReactNode} children - The children to be rendered.
 * @returns {import('react').JSX.Element} The wrapped application component.
 * @example
 * return (
 *   <AppWrapper />
 * );
 */
function AppProvider({ children }) {
  return (
    <ReduxProvider store={getStore()}>
      <App>
        <PageWrapper>{children}</PageWrapper>
      </App>
    </ReduxProvider>
  );
}

export default AppProvider;
