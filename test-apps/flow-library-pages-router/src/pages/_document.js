/**
 * This is the document component.
 * @file It is saved as src/pages/_document.js.
 */
import { Html, Head, Main, NextScript } from 'next/document';

/**
 * This is the document component.
 * @returns {React.ReactNode} The document component.
 * @example
 * <Document />
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
