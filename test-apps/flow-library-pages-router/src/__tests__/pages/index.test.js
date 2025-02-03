/**
 * Home Page unit tests.
 * @file This file is saved as `Home.test.jsx`.
 */
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ReduxProvider,
  log,
  usePagesBackPress,
} from '@arpitmalik832/next-js-rollup-flow-monorepo-library';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  sampleQuery,
  useFetchDataQuery,
} from '../../redux/queries/sampleQuery';

import Home from '../../pages';

// Mock the library components and hooks
jest.mock('@arpitmalik832/next-js-rollup-flow-monorepo-library', () => ({
  __esModule: true,
  ...jest.requireActual('@arpitmalik832/next-js-rollup-flow-monorepo-library'),
  log: jest.fn(),
  usePagesBackPress: jest.fn(),
}));

// Mock the custom Button component
jest.mock('../../components/atoms/Button', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="custom-button">Custom Button</div>),
}));

jest.mock('../../components/atoms/ButtonV2', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="library-button">Library Button</div>
  )),
}));

// Mock the React icon
jest.mock('../../assets/icons/react.svg', () => ({
  ReactComponent: () => <div data-testid="react-icon">React Icon</div>,
}));

jest.mock('../../redux/queries/sampleQuery', () => ({
  ...jest.requireActual('../../redux/queries/sampleQuery'),
  useFetchDataQuery: jest.fn(),
}));

describe('Home Page Tests', () => {
  let store;
  // Mock the query hook before rendering
  const mockQueryData = {
    data: { testData: 'test' },
    isLoading: false,
    isError: false,
  };

  beforeEach(() => {
    // Import and mock the query directly
    useFetchDataQuery.mockReturnValue(mockQueryData);

    // Create a slice for apis and navigation
    const apisSlice = createSlice({
      name: 'apis',
      initialState: [
        {
          host: 'no-url',
          headers: { x: 'a' },
          axiosInstance: axios.create({ baseURL: 'https://abc.com' }),
        },
      ],
      reducers: {
        addNewApiData: (state, action) => [...state, action.payload],
      },
    });

    // Configure store before each test
    store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
        [sampleQuery.reducerPath]: sampleQuery.reducer,
      },
      middleware: getDefault =>
        getDefault({
          serializableCheck: {
            ignoredActions: ['apis/addNewApiData'],
            ignoredPaths: ['apis', sampleQuery.reducerPath],
          },
        }).concat(sampleQuery.middleware),
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <ReduxProvider store={store}>
        <Home />
      </ReduxProvider>,
    );

  it('renders without crashing', () => {
    const { container } = renderComponent();
    expect(container).toBeTruthy();
  });

  it('renders all required components', () => {
    renderComponent();

    // Check for text content
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByTestId('library-button')).toBeInTheDocument();
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();

    // Check for React icon
    expect(screen.getByTestId('react-icon')).toBeInTheDocument();
  });

  it('initializes with useBackPress hook', () => {
    renderComponent();

    expect(usePagesBackPress).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('handles API state correctly', () => {
    renderComponent();

    expect(log).toHaveBeenCalledWith(mockQueryData);
  });

  it('renders correctly with loading state', () => {
    // Mock the useFetchDataQuery hook result for loading state
    useFetchDataQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderComponent();

    expect(log).toHaveBeenCalledWith({
      isLoading: true,
      data: undefined,
      isError: false,
    });
  });
});
