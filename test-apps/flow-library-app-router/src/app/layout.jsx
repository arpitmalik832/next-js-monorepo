/**
 * This is the root layout of the application.
 * @file File is saved as src/app/layout.jsx.
 */
import AppProvider from '../AppProvider';
import SWRegistration from '../components/organisms/SWRegistration';

import '@arpitmalik832/next-js-rollup-flow-monorepo-library/styles/postcss-processed/index.css';

/**
 * This is the root layout of the application.
 * @param {JSX.Element} children - The children of the root layout.
 * @returns {JSX.Element} The root layout of the application.
 * @example
 * <RootLayout>
 *   <HomePage />
 * </RootLayout>
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SWRegistration />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
