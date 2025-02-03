/**
 * The useHome unit tests.
 * @file This file is saved as `useHome.test.jsx`.
 */
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  log,
  useAppBackPress,
  useIsClient,
} from '@arpitmalik832/next-js-rollup-flow-monorepo-library';
import '@testing-library/jest-dom';

import useHome from '../useHome';
import { useFetchDataQuery } from '../../redux/queries/sampleQuery';

// Mock the library functions
jest.mock('@arpitmalik832/next-js-rollup-flow-monorepo-library', () => ({
  log: jest.fn(),
  useAppBackPress: jest.fn(),
  useIsClient: jest.fn(),
}));

// Mock the navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
}));

// Mock the query
jest.mock('../../redux/queries/sampleQuery', () => ({
  useFetchDataQuery: jest.fn(),
}));

describe('useHome Hook', () => {
  let store;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock useIsClient to return true by default
    useIsClient.mockReturnValue(true);

    // Mock useFetchDataQuery with default values
    useFetchDataQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    // Create a mock store with necessary slices
    const apisSlice = createSlice({
      name: 'apis',
      initialState: [
        {
          axiosInstance: axios.create({ baseURL: 'https://test-api.com' }),
        },
      ],
      reducers: {},
    });

    store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredPaths: ['apis'],
          },
        }),
    });
  });

  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('should initialize correctly', () => {
    renderHook(() => useHome(), { wrapper });

    expect(useAppBackPress).toHaveBeenCalled();
    expect(useIsClient).toHaveBeenCalled();
  });

  it('should skip query when not client-side', () => {
    useIsClient.mockReturnValue(false);

    renderHook(() => useHome(), { wrapper });

    // Get the first argument (the axiosInstance) from the actual call
    const actualCall = useFetchDataQuery.mock.calls[0];

    // Verify the axiosInstance is passed as first argument
    expect(actualCall[0]).toBeDefined();
    // Verify the options object is passed as second argument
    expect(actualCall[1]).toEqual({ skip: true });
  });

  it('should make query when client-side', () => {
    useIsClient.mockReturnValue(true);

    renderHook(() => useHome(), { wrapper });

    // Get the first argument (the axiosInstance) from the actual call
    const actualCall = useFetchDataQuery.mock.calls[0];

    // Verify the axiosInstance is passed as first argument
    expect(actualCall[0]).toBeDefined();
    // Verify the options object is passed as second argument
    expect(actualCall[1]).toEqual({ skip: false });
  });

  it('should log query status and data', () => {
    const mockQueryResult = {
      data: { test: 'data' },
      isLoading: false,
      isError: false,
    };
    useFetchDataQuery.mockReturnValue(mockQueryResult);

    renderHook(() => useHome(), { wrapper });

    expect(log).toHaveBeenCalledWith({
      isLoading: mockQueryResult.isLoading,
      data: mockQueryResult.data,
      isError: mockQueryResult.isError,
    });
  });

  it('should handle query error state', () => {
    const mockQueryResult = {
      data: null,
      isLoading: false,
      isError: true,
    };
    useFetchDataQuery.mockReturnValue(mockQueryResult);

    renderHook(() => useHome(), { wrapper });

    expect(log).toHaveBeenCalledWith({
      isLoading: false,
      data: null,
      isError: true,
    });
  });

  it('should handle query loading state', () => {
    const mockQueryResult = {
      data: null,
      isLoading: true,
      isError: false,
    };
    useFetchDataQuery.mockReturnValue(mockQueryResult);

    renderHook(() => useHome(), { wrapper });

    expect(log).toHaveBeenCalledWith({
      isLoading: true,
      data: null,
      isError: false,
    });
  });
});
