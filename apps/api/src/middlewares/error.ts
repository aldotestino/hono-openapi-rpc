import type { ErrorHandler } from 'hono';
import { UnauthorizedError } from '../lib/errors';

export const onError: ErrorHandler = (err, c) => {
  if (err instanceof UnauthorizedError) {
    return c.json({ message: err.message }, 401);
  }
  return c.json({ error: 'Internal Server Error' }, 500);
};
