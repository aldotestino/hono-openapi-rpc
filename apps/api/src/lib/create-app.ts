import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { BASE_PATH } from './constants';
import { createRouter } from './create-router';
import type { AppOpenAPI } from './types';

export function createApp() {
  const app = createRouter()
    .get('/health', (c) => c.json({ status: 'ok' }))
    // Serve static files if path does not start with BASE_PATH
    .use('*', (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }
      return serveStatic({ root: './public' })(c, next);
    })
    .use(requestId())
    .use(logger())
    .basePath(BASE_PATH) as AppOpenAPI;

  return app;
}
