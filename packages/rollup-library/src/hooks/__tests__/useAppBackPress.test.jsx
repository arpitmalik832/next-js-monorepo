/**
 * Unit tests for useBackPress hook.
 * @file The file is saved as `useBackPress.test.jsx`.
 */
import { renderHook, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux';
import { useRouter } from 'next/navigation';

import useBackPress from '../useAppBackPress';
import {
  clearStack,
  popStack,
  pushStack,
} from '../../redux/slices/navigationSlice';

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock navigation slice
jest.mock('../../redux/slices/navigationSlice', () => ({
  clearStack: jest.fn(),
  popStack: jest.fn(),
  pushStack: jest.fn(),
}));

jest.mock('../../utils/eventListeners/beforeUnload', () => ({
  __esModule: true,
  default: {
    subscribe: e => e({}),
    unSubscribe: jest.fn(),
  },
}));

jest.mock('../../utils/logsUtils', () => ({
  __esModule: true,
  log: jest.fn(),
  errorLog: jest.fn(),
}));

describe('useBackPress unit tests', () => {
  const mockDispatch = jest.fn();
  const mockRouter = {
    back: jest.fn(),
    push: jest.fn(),
    // Add any other router methods you use in your hook
  };

  beforeEach(() => {
    // Setup mocks
    useRouter.mockReturnValue(mockRouter);
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    reactRedux.useSelector.mockImplementation(selector =>
      selector({
        navigation: {
          stack: [],
        },
      }),
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('snapshot test', () => {
    const { result } = renderHook(() => useBackPress());

    expect(result.current).toMatchSnapshot();
  });

  it('testing push function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.push();
    expect(pushStack).toHaveBeenCalledTimes(1);
  });

  it('testing pop function', () => {
    reactRedux.useSelector.mockImplementation(selector =>
      selector({
        navigation: {
          stack: [() => jest.fn()],
        },
      }),
    );
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(1);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing clear function with empty stack', () => {
    const { result } = renderHook(() => useBackPress());
    result.current.clear();
    expect(clearStack).not.toHaveBeenCalled();
  });

  it('testing clear function with items in stack', () => {
    reactRedux.useSelector.mockImplementation(selector =>
      selector({
        navigation: {
          stack: [jest.fn()],
        },
      }),
    );
    const { result } = renderHook(() => useBackPress());
    result.current.clear();
    expect(clearStack).toHaveBeenCalled();
  });
});
