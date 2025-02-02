/* eslint-disable no-underscore-dangle */
/**
 * This is the test for the hello API endpoint.
 * @file It is saved as src/api/__tests__/hello.test.js.
 */
import { createMocks } from 'node-mocks-http';
import handler from '../hello';

describe('Hello API Endpoint', () => {
  it('returns correct response', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ name: 'John Doe' });
  });

  it('sets correct content type header', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getHeaders()['content-type']).toMatch(/application\/json/);
  });

  it('handles request correctly', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._isEndCalled()).toBeTruthy();
  });
});
