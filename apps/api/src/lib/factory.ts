import { OpenAPIHono } from '@hono/zod-openapi';
import type { Schema } from 'hono';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { withAuth } from '../middlewares/auth';
import { onError } from '../middlewares/error';
import { serveWebApp } from '../middlewares/serve-web-app';
import { auth } from './auth';
import { BASE_PATH, TEST_USER } from './constants';
import type { AppEnv, AppOpenAPI } from './types';

export function createRouter() {
  return new OpenAPIHono<AppEnv>({
    strict: false,
  });
}

export function createApp({ useLogger = true }: { useLogger?: boolean } = {}) {
  const app = createRouter()
    .use('*', serveWebApp)
    .basePath(BASE_PATH) as AppOpenAPI;

  app
    .use(requestId())
    .use(useLogger ? logger() : (_, next) => next())
    .on(['POST', 'GET'], '/auth/*', (c) => {
      return auth.handler(c.req.raw);
    })
    .use(withAuth)
    .onError(onError);

  return app;
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createRouter()
    .use((c, next) => {
      c.set('user', TEST_USER);

      return next();
    })
    .basePath(BASE_PATH)
    .route('/', router)
    .onError(onError);
}
