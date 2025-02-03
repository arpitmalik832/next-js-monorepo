/**
 * This is the SWRegistration test.
 * @file File is saved as `SWRegistration.test.jsx`.
 */
import { render } from '@testing-library/react';
import { SWRegistration as LibSWRegistration } from '@arpitmalik832/next-js-rollup-flow-monorepo-library';

import ServiceWorkerRegistration from '../SWRegistration';

// Mock the library's SWRegistration
jest.mock('@arpitmalik832/next-js-rollup-flow-monorepo-library', () => ({
  SWRegistration: {
    register: jest.fn(),
    unregister: jest.fn(),
  },
  errorLog: jest.fn(),
}));

describe('ServiceWorkerRegistration', () => {
  beforeEach(() => {
    // Clear mock before each test
    jest.clearAllMocks();
  });

  it('renders nothing (returns null)', () => {
    const { container } = render(<ServiceWorkerRegistration />);
    expect(container.firstChild).toBeNull();
  });

  it('calls SWRegistration.register on mount', () => {
    render(<ServiceWorkerRegistration />);
    expect(LibSWRegistration.register).toHaveBeenCalledTimes(1);
  });

  it('calls register only once even after rerender', () => {
    const { rerender } = render(<ServiceWorkerRegistration />);

    // Rerender the component
    rerender(<ServiceWorkerRegistration />);

    // Should still only be called once
    expect(LibSWRegistration.register).toHaveBeenCalledTimes(1);
  });

  it('handles register errors gracefully', () => {
    // Mock console.error to catch potential errors
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Make register throw an error
    LibSWRegistration.register.mockImplementationOnce(() => {
      throw new Error('Registration failed');
    });

    // Component should render without crashing
    expect(() => render(<ServiceWorkerRegistration />)).not.toThrow();

    // Cleanup
    consoleSpy.mockRestore();
  });

  // Test cleanup if needed
  it('does not attempt to re-register on unmount', () => {
    const { unmount } = render(<ServiceWorkerRegistration />);

    // Clear the initial register call
    LibSWRegistration.register.mockClear();

    // Unmount the component
    unmount();

    // Verify register wasn't called again
    expect(LibSWRegistration.register).not.toHaveBeenCalled();
  });
});
