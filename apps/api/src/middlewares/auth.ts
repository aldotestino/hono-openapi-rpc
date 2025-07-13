import { auth } from '../lib/auth';
import { createMiddleware } from '../lib/factory';

export const withAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);

    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);

  return next();
});

export const requireAuth = createMiddleware((c, next) => {
  if (!c.get('user')) {
    throw new Error('Unauthorized');
  }

  return next();
});
