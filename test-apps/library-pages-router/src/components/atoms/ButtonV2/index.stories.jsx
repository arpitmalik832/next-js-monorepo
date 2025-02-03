/**
 * This file is used to test the Button component.
 * @file This file is saved as 'src/components/atoms/Button/index.stories.jsx'.
 */
import { ReduxProvider } from '@arpitmalik832/next-js-rollup-monorepo-library';

import Button from '../Button';
import store from '../../../redux/store/store';

export default {
  title: 'Atoms/ButtonV2',
  component: () => (
    <ReduxProvider store={store}>
      <Button />
    </ReduxProvider>
  ),
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};
