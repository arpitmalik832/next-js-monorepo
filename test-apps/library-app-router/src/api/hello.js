/**
 * This is the API route for the home page.
 * @file It is saved as src/pages/api/hello.js.
 */

/**
 * This is the API route for the home page.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @example
 * <Hello />
 */
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
