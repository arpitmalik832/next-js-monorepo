/**
 * This is the document component test.
 * @file It is saved as src/pages/__tests__/document.test.js.
 */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Document from '../../pages/_document';

// Mock next/document components
jest.mock('next/document', () => ({
  __esModule: true,
  Html: ({ children }) => <div data-testid="mock-html">{children}</div>,
  Head: () => <div data-testid="mock-head" data-type="head" />,
  Main: () => <div data-testid="mock-main" data-type="main" />,
  NextScript: () => (
    <div data-testid="mock-nextscript" data-type="nextscript" />
  ),
}));

describe('Document Component', () => {
  it('renders document structure correctly', () => {
    const { getByTestId } = render(<Document />);

    // Check if essential components are present
    expect(getByTestId('mock-nextscript')).toBeInTheDocument();
    expect(getByTestId('mock-main')).toBeInTheDocument();
  });

  it('renders components in correct order', () => {
    const { container } = render(<Document />);

    expect(container).toMatchSnapshot();
  });
});
