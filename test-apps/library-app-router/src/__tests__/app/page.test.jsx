/**
 * This is the test file for the home page component.
 * @file File is saved as src/__tests__/app/page.test.jsx.
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../app/page';

// Mock the HomeClient component
jest.mock('../../components/organisms/HomeClient', () => ({
  __esModule: true,
  default: () => <div data-testid="home-client">Mock HomeClient</div>,
}));

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders the home text', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders the HomeClient component', () => {
    expect(screen.getByTestId('home-client')).toBeInTheDocument();
  });

  it('maintains correct component hierarchy', () => {
    const container = screen.getByText('Home').parentElement;
    expect(container).toContainElement(screen.getByTestId('home-client'));
  });

  it('renders all required elements', () => {
    const homeText = screen.getByText('Home');
    const homeClient = screen.getByTestId('home-client');

    expect(homeText).toBeInTheDocument();
    expect(homeClient).toBeInTheDocument();
  });

  it('renders HomeClient with correct content', () => {
    const homeClient = screen.getByTestId('home-client');
    expect(homeClient).toHaveTextContent('Mock HomeClient');
  });

  it('wraps content in a div', () => {
    const wrapper = screen.getByText('Home').closest('div');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.tagName).toBe('DIV');
  });
});
