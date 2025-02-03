/**
 * Redux store configuration for production environment.
 * @file This file is saved as `redux/store/store.prod,js`.
 */
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
          ignoredActions: ['apis/addNewApiData', 'navigation/pushStack'],
          ignoredPaths: ['apis', 'sampleQuery', 'navigation'],
        },
      }).concat(sampleQuery.middleware),
  });

export default getStore;
