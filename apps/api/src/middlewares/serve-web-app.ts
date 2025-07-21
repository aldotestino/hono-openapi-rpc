import type { MiddlewareHandler } from 'hono';
import { serveStatic } from 'hono/bun';
import { BASE_PATH, STATIC_FILE_REGEX } from '../lib/constants';
import type { AppEnv } from '../lib/types';

export const serveWebApp: MiddlewareHandler<AppEnv> = (c, next) => {
  // Skip if it's an API route
  if (c.req.path.startsWith(BASE_PATH)) {
    return next();
  }

  // Serve static files for assets
  if (c.req.path.match(STATIC_FILE_REGEX)) {
    return serveStatic({ root: './public' })(c, next);
  }

  // For SPA routes (like /notes/new), serve index.html
  return serveStatic({ path: '/index.html', root: './public' })(c, next);
};
