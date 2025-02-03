/**
 * PageWrapper component that logs route changes and renders child components.
 * @file The file is saved as `PageWrapper/index.jsx`.
 */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { log } from '@arpitmalik832/next-js-rollup-flow-monorepo-library';

/**
 * PageWrapper component that logs route changes and renders child components.
 * @param {object} props - The props passed to this HOC.
 * @param {import('react').ReactNode} props.children - Children Component.
 * @returns {import('react').JSX.Element} The rendered component.
 * @example
 * <PageWrapper />
 */
function PageWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    log('Route changed:', router);
  }, [router]);

  return <div>Page Wrapper{children}</div>;
}

export default PageWrapper;
