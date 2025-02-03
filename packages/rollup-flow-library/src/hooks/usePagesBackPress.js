// @flow
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  clearStack,
  popStack,
  pushStack,
} from '../redux/slices/navigationSlice';
import beforeUnload from '../utils/eventListeners/beforeUnload';
import { log } from '../utils/logsUtils';
import { APP_UNMOUNT } from '../enums/app';
import useIsClient from './useIsClient';

function useBackPress(): UseBackPress {
  const { stack } = useSelector(state => state.navigation);
  const dispatch = useDispatch();
  const router = useRouter();
  const isClient = useIsClient();

  const handleBackPress = useCallback(() => {
    if (stack.length) {
      dispatch(popStack());
    } else {
      router.back();
    }
  }, [stack]);

  useEffect(() => {
    if (isClient) {
      window.backPress = handleBackPress;
      beforeUnload.subscribe(() => {
        log(APP_UNMOUNT);
      });

      return () => {
        beforeUnload.unSubscribe();
      };
    }
    return () => {};
  }, [isClient]);

  function push(callback: VoidFunctionWithParams<mixed>) {
    dispatch(pushStack(callback));
  }

  function pop() {
    handleBackPress();
  }

  const clear = useCallback(() => {
    if (stack.length) {
      dispatch(clearStack());
    }
  }, [stack]);

  return { stack, push, pop, clear };
}

export default useBackPress;
