/**
 * This is the test file for the layout component.
 * @file File is saved as src/__tests__/app/layout.test.jsx.
 */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import RootLayout from '../../app/layout';

// Mock the components and styles
jest.mock('../../AppProvider', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="app-provider">{children}</div>,
}));

jest.mock('../../components/organisms/SWRegistration', () => ({
  __esModule: true,
  default: () => <div data-testid="sw-registration" />,
}));

// Mock the CSS import
jest.mock(
  '@arpitmalik832/next-js-rollup-monorepo-library/styles/postcss-processed/index.css',
  () => ({}),
);

describe('RootLayout', () => {
  const renderLayout = (children = 'Test Content') =>
    render(<RootLayout>{children}</RootLayout>);

  it('renders SWRegistration component', () => {
    const { getByTestId } = renderLayout();
    expect(getByTestId('sw-registration')).toBeInTheDocument();
  });

  it('renders AppProvider with children', () => {
    const testContent = <div data-testid="test-content">Test Child</div>;
    const { getByTestId } = renderLayout(testContent);

    const appProvider = getByTestId('app-provider');
    const testChild = getByTestId('test-content');

    expect(appProvider).toBeInTheDocument();
    expect(testChild).toBeInTheDocument();
    expect(testChild).toHaveTextContent('Test Child');
  });

  it('maintains correct component nesting order', () => {
    const { getByTestId } = renderLayout();

    const swRegistration = getByTestId('sw-registration');
    const appProvider = getByTestId('app-provider');
    // SWRegistration should come before AppProvider
    expect(swRegistration.compareDocumentPosition(appProvider)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('passes children to AppProvider', () => {
    const testContent = 'Test Content';
    const { getByTestId } = renderLayout(testContent);

    const appProvider = getByTestId('app-provider');
    expect(appProvider).toHaveTextContent(testContent);
  });

  it('renders with multiple children', () => {
    const multipleChildren = (
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </>
    );
    const { getByTestId } = renderLayout(multipleChildren);

    expect(getByTestId('child-1')).toBeInTheDocument();
    expect(getByTestId('child-2')).toBeInTheDocument();
  });
});
