/**
 * HomeClient component unit tests.
 * @file This file is saved as `components/organisms/__tests__/HomeClient.test.jsx`.
 */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomeClient from '../HomeClient';

// Mock the components
jest.mock('../../atoms/Button', () => ({
  __esModule: true,
  default: () => <div data-testid="button">Button</div>,
}));

jest.mock('../../atoms/ButtonV2', () => ({
  __esModule: true,
  default: () => <div data-testid="button-v2">ButtonV2</div>,
}));

// Mock the SVG import
jest.mock('../../../assets/images/react.svg', () => ({
  ReactComponent: () => <div data-testid="react-icon">ReactIcon</div>,
}));

// Mock the hook
jest.mock('../../../hooks/useHome', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('HomeClient', () => {
  let store;

  beforeEach(() => {
    // Create a mock store
    store = configureStore({
      reducer: {
        // Add any required reducers here
        dummy: (state = {}) => state,
      },
    });
  });

  const renderWithProvider = ui =>
    render(<Provider store={store}>{ui}</Provider>);

  it('renders without crashing', () => {
    const { container } = renderWithProvider(<HomeClient />);
    expect(container).toBeInTheDocument();
  });

  it('renders all child components', () => {
    const { getByTestId } = renderWithProvider(<HomeClient />);

    expect(getByTestId('button')).toBeInTheDocument();
    expect(getByTestId('button-v2')).toBeInTheDocument();
    expect(getByTestId('react-icon')).toBeInTheDocument();
  });

  it('maintains correct component hierarchy', () => {
    const { container, getByTestId } = renderWithProvider(<HomeClient />);
    const wrapper = container.firstChild;

    expect(wrapper).toContainElement(getByTestId('button'));
    expect(wrapper).toContainElement(getByTestId('button-v2'));
    expect(wrapper).toContainElement(getByTestId('react-icon'));
  });

  it('renders components in correct order', () => {
    const { getByTestId } = renderWithProvider(<HomeClient />);

    const button = getByTestId('button');
    const buttonV2 = getByTestId('button-v2');
    const reactIcon = getByTestId('react-icon');

    expect(button.compareDocumentPosition(buttonV2)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(buttonV2.compareDocumentPosition(reactIcon)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('calls useHome hook on render', () => {
    const useHome = jest.requireMock('../../../hooks/useHome').default;
    renderWithProvider(<HomeClient />);
    expect(useHome).toHaveBeenCalled();
  });

  it('wraps content in a div', () => {
    const { container } = renderWithProvider(<HomeClient />);
    expect(container.firstChild.tagName).toBe('DIV');
  });

  it('renders with correct structure', () => {
    const { container } = renderWithProvider(<HomeClient />);
    const wrapper = container.firstChild;

    expect(wrapper.children).toHaveLength(3); // Button, ButtonV2, ReactIcon
    expect(wrapper.children[0]).toHaveAttribute('data-testid', 'button');
    expect(wrapper.children[1]).toHaveAttribute('data-testid', 'button-v2');
    expect(wrapper.children[2]).toHaveAttribute('data-testid', 'react-icon');
  });
});
