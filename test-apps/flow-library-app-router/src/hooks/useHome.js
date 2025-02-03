'use client';

/**
 * This is the main page hook of the application.
 * @file File is saved as src/app/useHome.jsx.
 */
import {
  useAppBackPress,
  log,
  useIsClient,
} from '@arpitmalik832/next-js-rollup-flow-monorepo-library';
import { useSelector } from 'react-redux';

import { useFetchDataQuery } from '../redux/queries/sampleQuery';

const useHome = () => {
  const apis = useSelector(state => state.apis);
  const isClient = useIsClient();

  useAppBackPress();
  const { data, isLoading, isError } = useFetchDataQuery(
    apis[0]?.axiosInstance,
    {
      skip: !isClient,
    },
  );

  log({ isLoading, data, isError });
};

export default useHome;
