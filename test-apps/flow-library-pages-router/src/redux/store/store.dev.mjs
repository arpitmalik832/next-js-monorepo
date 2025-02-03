/**
 * This file is used to create the redux store for development environment.
 * @file This file is saved as `redux/store/store.dev.js`.
 */
import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import { slices } from '@arpitmalik832/next-js-rollup-flow-monorepo-library';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/extensions
import { sampleQuery } from '../queries/sampleQuery.js';

const getStore = () =>
  configureStore({
    reducer: {
      app: slices.appSlice.reducer,
      apis: slices.apisSlice.reducer,
      navigation: slices.navigationSlice.reducer,
      sampleQuery: sampleQuery.reducer,
    },
    middleware: getDefault =>
      getDefault({
        serializableCheck: {
          ignoredActions: [
            'apis/addNewApiData',
            'navigation/pushStack',
            'sampleQuery/executeQuery/rejected',
            'sampleQuery/executeQuery/fulfilled',
          ],
          ignoredPaths: ['apis', 'sampleQuery', 'navigation'],
        },
      }).concat(sampleQuery.middleware, thunk, logger),
  });

export default getStore;
