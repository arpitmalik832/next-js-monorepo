'use client';

/**
 * This is the ServiceWorkerRegistration component.
 * @file This file is saved as 'src/components/SWRegistration/index.js'.
 */

import { useEffect } from 'react';

import {
  errorLog,
  SWRegistration,
} from '@arpitmalik832/next-js-rollup-flow-monorepo-library';

/**
 * This is the ServiceWorkerRegistration component.
 * @returns {null} The ServiceWorkerRegistration component.
 * @example
 * <ServiceWorkerRegistration />
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    try {
      SWRegistration.register();
    } catch (error) {
      errorLog('Error while registering service worker', error);
    }

    return () => {
      SWRegistration.unregister();
    };
  }, []);

  return null;
}
