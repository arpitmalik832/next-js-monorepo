/**
 * This hook is used to initialize axios.
 * @file This file is saved as 'src/hooks/useInitAxios.js'.
 */
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import {
  addRequestInterceptor,
  addResponseInterceptor,
  slices,
  APP,
} from '@arpitmalik832/next-js-rollup-monorepo-library';

/**
 * This hook is used to initialize axios.
 * @example
 * ```js
 * const dispatch = useDispatch();
 * const api1 = {
 *   host: 'no-host',
 *   headers: {},
 * };
 * useInitAxios(dispatch, api1);
 * ```
 */
function useInitAxios() {
  const dispatch = useDispatch();
  const api1 = {
    host: 'no-host',
    headers: {},
  };

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: api1.host,
      timeout: APP.API1_TIMEOUT,
      headers: {
        common: {
          ...api1.headers,
        },
      },
    });

    addRequestInterceptor(axiosInstance);
    addResponseInterceptor(axiosInstance);

    const api1Final = {
      host: api1.host,
      headers: api1.headers,
      axiosInstance,
    };

    dispatch(slices.addNewApiData(api1Final));
  }, []);
}

export default useInitAxios;
