/**
 * The main application component.
 * @file The file is saved as `App.jsx`.
 */

import useAppMount from './hooks/useAppMount';

/**
 * Main application component.
 * @param {import('react').ReactNode} children - The children to be rendered.
 * @returns {import('react').JSX.Element} The rendered application.
 * @example
 * <App />
 */
function App({ children }) {
  useAppMount();

  return children;
}

export default App;
