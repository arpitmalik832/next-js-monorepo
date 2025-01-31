/**
 * Home Page.
 * @file This file is saved as `Home/index.jsx`.
 */
import {
  useBackPress,
  log,
  useIsClient,
} from '@arpitmalik832/next-js-rollup-monorepo-library';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Button from '../components/atoms/Button';
import ButtonV2 from '../components/atoms/ButtonV2';
import { ReactComponent as ReactIcon } from '../assets/images/react.svg';
import { useFetchDataQuery } from '../redux/queries/sampleQuery';

/**
 * Home component renders the home page with buttons.
 * @returns {import('react').JSX.Element} The rendered component.
 * @example
 * <Home />
 */
function Home() {
  const apis = useSelector(state => state.apis);
  const isClient = useIsClient();

  useBackPress();
  const { data, isLoading, isError } = useFetchDataQuery(
    apis[0]?.axiosInstance,
    {
      skip: !isClient,
    },
  );

  useEffect(() => {
    log({ isLoading, data, isError });
  }, [isLoading, data, isError]);

  return (
    <div>
      Home
      <Button />
      <ButtonV2 />
      <ReactIcon />
    </div>
  );
}

export default Home;
