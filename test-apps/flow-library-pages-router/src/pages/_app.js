/**
 * This is the main app component.
 * @file It is saved as src/pages/_app.js.
 */
import AppProvider from '../AppProvider';
import SWRegistration from '../components/organisms/SWRegistration';

import '@arpitmalik832/next-js-rollup-flow-monorepo-library/styles/postcss-processed/index.css';

/**
 * This is the main app component.
 * @param {object} root0 - The root object.
 * @param {React.ReactNode} root0.Component - The component to render.
 * @param {object} root0.pageProps - The page props.
 * @returns {React.ReactNode} The component to render.
 * @example
 * <App Component={Component} pageProps={pageProps} />
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRegistration />
      <AppProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
