/**
 * This is the app component test.
 * @file It is saved as src/pages/__tests__/app.test.js.
 */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../pages/_app';
import AppProvider from '../../AppProvider';
import SWRegistration from '../../components/organisms/SWRegistration';

// Mock the components
jest.mock('../../AppProvider', () =>
  jest.fn(({ children }) => <div data-testid="mock-provider">{children}</div>),
);

jest.mock('../../components/organisms/SWRegistration', () =>
  jest.fn(() => <div data-testid="mock-sw-registration" />),
);

// Mock the CSS import
jest.mock(
  '@arpitmalik832/next-js-rollup-monorepo-library/styles/postcss-processed/index.css',
  () => ({}),
);

describe('App Component', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    jest.clearAllMocks();
  });

  it('renders SWRegistration component', () => {
    const MockComponent = jest.fn(() => <div>Mock Page Component</div>);
    const mockPageProps = { testProp: 'test value' };

    const { getByTestId } = render(
      <App Component={MockComponent} pageProps={mockPageProps} />,
    );

    expect(getByTestId('mock-sw-registration')).toBeInTheDocument();
    expect(SWRegistration).toHaveBeenCalled();
  });

  it('renders AppProvider with children', () => {
    const MockComponent = jest.fn(() => <div>Mock Page Component</div>);
    const mockPageProps = { testProp: 'test value' };

    const { getByTestId } = render(
      <App Component={MockComponent} pageProps={mockPageProps} />,
    );

    expect(getByTestId('mock-provider')).toBeInTheDocument();
    expect(AppProvider).toHaveBeenCalled();
  });

  it('renders page component with correct props', () => {
    const MockComponent = jest.fn(() => <div>Mock Page Component</div>);
    const mockPageProps = { testProp: 'test value' };

    render(<App Component={MockComponent} pageProps={mockPageProps} />);

    expect(MockComponent).toHaveBeenCalledWith(mockPageProps, undefined);
  });

  it('handles undefined pageProps', () => {
    const MockComponent = jest.fn(() => <div>Mock Page Component</div>);

    render(<App Component={MockComponent} />);

    expect(MockComponent).toHaveBeenCalledWith({}, undefined);
  });

  it('renders the complete component tree in correct order', () => {
    const MockComponent = () => <div data-testid="mock-page">Page Content</div>;
    const mockPageProps = { testProp: 'test value' };

    const { getByTestId } = render(
      <App Component={MockComponent} pageProps={mockPageProps} />,
    );

    // Check components are rendered in the correct order
    const provider = getByTestId('mock-provider');
    const swRegistration = getByTestId('mock-sw-registration');
    const pageComponent = getByTestId('mock-page');

    expect(swRegistration).toBeInTheDocument();
    expect(provider).toBeInTheDocument();
    expect(pageComponent).toBeInTheDocument();

    // Verify the page component is inside the provider
    expect(provider).toContainElement(pageComponent);
  });

  it('preserves AppProvider props when rendering', () => {
    const MockComponent = () => <div>Mock Page Component</div>;

    render(<App Component={MockComponent} pageProps={{}} />);

    expect(AppProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.any(Object),
      }),
      undefined,
    );
  });
});
