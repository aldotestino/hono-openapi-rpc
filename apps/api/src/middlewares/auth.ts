import type { MiddlewareHandler } from 'hono';
import { auth } from '../lib/auth';
import { UnauthorizedError } from '../lib/errors';
import type { AppEnv } from '../lib/types';

export const withAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (session) {
    c.set('user', session.user);
    c.set('session', session.session);
  }

  return next();
};

export const requireAuth: MiddlewareHandler<AppEnv> = (c, next) => {
  const user = c.get('user');
  if (!user) {
    throw new UnauthorizedError('Unauthorized');
  }
  return next();
};
