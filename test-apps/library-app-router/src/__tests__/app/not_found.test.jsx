/**
 * This is the test file for the not found page component.
 * @file File is saved as src/__tests__/app/not-found.test.jsx.
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '../../app/not-found';

// Mock the Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }) => (
    <a href={href} className={className} data-testid="mock-link">
      {children}
    </a>
  ),
}));

// Mock the SCSS module
jest.mock('../../app/NotFound.module.scss', () => ({
  main: 'main-class',
  title: 'title-class',
  description: 'description-class',
  link: 'link-class',
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(<NotFoundPage />);
  });

  it('renders the main container with correct class', () => {
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('main-class');
  });

  it('renders the 404 title with correct class', () => {
    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toHaveClass('title-class');
    expect(titleElement).toHaveTextContent('404 - Page Not Found');
  });

  it('renders the error description with correct class', () => {
    const descriptionElement = screen.getByText(
      'The page you are looking for does not exist.',
    );
    expect(descriptionElement).toHaveClass('description-class');
  });

  it('renders the home link with correct attributes', () => {
    const linkElement = screen.getByTestId('mock-link');

    expect(linkElement).toHaveAttribute('href', '/');
    expect(linkElement).toHaveClass('link-class');
    expect(linkElement).toHaveTextContent('Return to Home');
  });

  it('maintains correct component hierarchy', () => {
    const mainElement = screen.getByRole('main');
    const titleElement = screen.getByRole('heading', { level: 1 });
    const descriptionElement = screen.getByText(
      'The page you are looking for does not exist.',
    );
    const linkElement = screen.getByTestId('mock-link');

    expect(mainElement).toContainElement(titleElement);
    expect(mainElement).toContainElement(descriptionElement);
    expect(mainElement).toContainElement(linkElement);
  });

  it('renders all required elements', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Return to Home')).toBeInTheDocument();
  });

  it('applies all required CSS classes', () => {
    expect(screen.getByRole('main')).toHaveClass('main-class');
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
      'title-class',
    );
    expect(
      screen.getByText('The page you are looking for does not exist.'),
    ).toHaveClass('description-class');
    expect(screen.getByTestId('mock-link')).toHaveClass('link-class');
  });
});
