import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { auth } from './auth';
import { BASE_PATH } from './constants';
import { createRouter } from './create-router';
import type { AppOpenAPI } from './types';

export function createApp({ useLogger = true }: { useLogger?: boolean } = {}) {
  const app = createRouter()
    // Serve static files if path does not start with BASE_PATH
    .use('*', (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }
      return serveStatic({ root: './public' })(c, next);
    })
    .use(requestId())
    .use(useLogger ? logger() : (_, next) => next())
    .on(['POST', 'GET'], `${BASE_PATH}/auth/*`, (c) => {
      return auth.handler(c.req.raw);
    })
    .basePath(BASE_PATH) as AppOpenAPI;

  return app;
}
