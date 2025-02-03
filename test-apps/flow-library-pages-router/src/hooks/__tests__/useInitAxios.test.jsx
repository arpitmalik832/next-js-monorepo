/**
 * Unit tests for useInitAxios hook.
 * @file The file is saved as `useInitAxios.test.jsx`.
 */
import { cleanup, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import axios from 'axios';
import {
  addRequestInterceptor,
  addResponseInterceptor,
  slices,
} from '@arpitmalik832/next-js-rollup-flow-monorepo-library';

import useInitAxios from '../useInitAxios';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

// Mock library functions
jest.mock('@arpitmalik832/next-js-rollup-flow-monorepo-library', () => ({
  addRequestInterceptor: jest.fn(),
  addResponseInterceptor: jest.fn(),
  slices: {
    addNewApiData: jest.fn(payload => ({
      type: 'apis/addNewApiData',
      payload,
    })),
  },
  APP: {
    API1_TIMEOUT: 5000,
  },
}));

describe('useInitAxios unit tests', () => {
  let store;

  beforeEach(() => {
    // Create store with the slice
    store = configureStore({
      reducer: {
        apis: createSlice({
          name: 'apis',
          initialState: [],
          reducers: {
            addNewApiData: (state, action) => {
              state.push(action.payload);
            },
          },
        }).reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['apis/addNewApiData'],
            ignoredPaths: ['apis'],
          },
        }),
    });

    store.dispatch = jest.fn(store.dispatch);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  // Use react-redux Provider instead of ReduxProvider
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('should create axios instance with correct configuration', () => {
    renderHook(() => useInitAxios(), { wrapper });

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'no-host',
      timeout: 5000,
      headers: {
        common: {},
      },
    });
  });

  it('should add request and response interceptors', () => {
    renderHook(() => useInitAxios(), { wrapper });

    expect(addRequestInterceptor).toHaveBeenCalledTimes(1);
    expect(addResponseInterceptor).toHaveBeenCalledTimes(1);
  });

  it('should dispatch addNewApiData with correct payload', () => {
    renderHook(() => useInitAxios(), { wrapper });
    expect(store.dispatch).toHaveBeenCalledWith(
      slices.addNewApiData({
        host: 'no-host',
        headers: {},
        axiosInstance: expect.any(Object),
      }),
    );
  });

  it('should only initialize axios once', () => {
    const { rerender } = renderHook(() => useInitAxios(), { wrapper });

    // Initial render
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);

    // Rerender
    rerender();
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
