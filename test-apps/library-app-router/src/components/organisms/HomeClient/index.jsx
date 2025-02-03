'use client';

/**
 * This Component defines the Home Client page.
 * @file This file is saved as `components/organisms/HomeClient/index.jsx`.
 */
import Button from '../../atoms/Button';
import ButtonV2 from '../../atoms/ButtonV2';
import { ReactComponent as ReactIcon } from '../../../assets/images/react.svg';
import useHome from '../../../hooks/useHome';

/**
 * This function defines the Home client page.
 * @returns {import('react').ReactNode} - Returns the Home client page.
 * @example
 * <HomeClient />
 */
function HomeClient() {
  useHome();

  return (
    <div>
      <Button />
      <ButtonV2 />
      <ReactIcon />
    </div>
  );
}

export default HomeClient;
