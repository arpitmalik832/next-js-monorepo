/**
 * This is the not found page of the application.
 * @file File is saved as src/app/not-found.jsx.
 */
import Link from 'next/link';
import styles from './NotFound.module.scss';

/**
 * This is the not found page component.
 * @returns {JSX.Element} The not found page component.
 * @example
 * <NotFoundPage />
 */
export default function NotFoundPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        The page you are looking for does not exist.
      </p>
      <Link href="/" className={styles.link}>
        Return to Home
      </Link>
    </main>
  );
}
