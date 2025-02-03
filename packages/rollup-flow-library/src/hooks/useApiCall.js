// @flow
import { useState, useEffect, useCallback, useRef } from 'react';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import useApiRequest from './useApiRequest';

type UseApiCallParams<T> = {
  axiosInstance: AxiosInstance,
  requestType: string,
  url: string,
  body: T,
  isEnabled: boolean,
  retryCount: number,
  pollingDelay: number,
  pollingCount: number,
};

type UseApiCall = {
  isLoading: boolean,
  data: mixed,
  isError: boolean,
  error: mixed,
};

type RequestConfigWithBody<T> = {
  url: string,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
  body?: T,
};

function useApiCall<T, D>({
  axiosInstance,
  requestType,
  url,
  body,
  isEnabled = true,
  retryCount = 0,
  pollingDelay = 500,
  pollingCount = 0,
}: UseApiCallParams<T>): UseApiCall {
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<mixed>(null);
  const [data, setData] = useState<mixed>(null);

  // Use refs to maintain values between renders and within callbacks
  const retriesRef = useRef(0);
  const attemptsRef = useRef(0);
  const timeoutIdRef = useRef<?TimeoutID>(null);

  const { makeGetCall, makePostCall, makePutCall, makeDeleteCall } =
    useApiRequest();

  const getRequestFunction = useCallback(() => {
    switch (requestType) {
      case 'post':
        return makePostCall;
      case 'put':
        return makePutCall;
      case 'delete':
        return makeDeleteCall;
      case 'get':
      default:
        return makeGetCall;
    }
  }, [requestType]);

  const apiCall: () => Promise<void> = useCallback(async () => {
    setLoading(true);
    const promise: (params: RequestConfigWithBody<T>) => Promise<D> =
      getRequestFunction();

    try {
      const res = await promise({
        url,
        axiosInstance,
        body,
      });
      setData(res);
      setIsError(false);
      setError(null);
    } catch (err) {
      if (!retryCount || retriesRef.current >= retryCount) {
        setIsError(true);
        setError(err);
      } else {
        retriesRef.current += 1;
        await apiCall();
      }
    } finally {
      // Set loading to false if this is the last polling attempt
      if (!pollingCount) {
        setLoading(false);
      }
    }
  }, [url, axiosInstance, body, retryCount, pollingCount, isLoading]);

  const poll: () => Promise<void> = useCallback(async () => {
    await apiCall();
    attemptsRef.current += 1;
    // Only set up next poll if we haven't reached the polling count
    if (attemptsRef.current < pollingCount) {
      retriesRef.current = 0; // Reset retries after success
      timeoutIdRef.current = setTimeout(poll, pollingDelay);
    } else {
      setLoading(false); // Set loading to false on last poll
    }
  }, [pollingCount, pollingDelay]);

  // Effect to handle polling
  useEffect(() => {
    if (!isEnabled) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      setLoading(false);
      return;
    }

    // Reset counters when enabled changes
    retriesRef.current = 0;
    attemptsRef.current = 0;

    if (pollingCount) {
      poll();
    } else {
      apiCall();
    }
  }, [isEnabled, pollingCount]);

  useEffect(
    () => () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    },
    [],
  );

  return { isLoading, data, isError, error };
}

export default useApiCall;
