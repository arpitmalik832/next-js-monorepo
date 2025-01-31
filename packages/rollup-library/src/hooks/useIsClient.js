/**
 * This file gives us flag if it is in client or server.
 * @file This file is saved as `useIsClient.js`.
 */
import { useEffect, useState } from 'react';

/**
 * Hook to verify if it is client or server.
 * @returns {boolean} - Returns true if it is client.
 * @example
 * const isClient = useIsClient();
 */
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export default useIsClient;
