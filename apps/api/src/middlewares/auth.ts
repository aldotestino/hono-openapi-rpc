import { auth } from '../lib/auth';
import { UnauthorizedError } from '../lib/errors';
import { createMiddleware } from '../lib/factory';

export const withAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);

  return next();
});

export const requireAuth = createMiddleware((c, next) => {
  if (!c.get('user')) {
    throw new UnauthorizedError('Unauthorized');
  }

  return next();
});
