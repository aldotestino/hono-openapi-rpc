import { OpenAPIHono, type RouteConfig } from '@hono/zod-openapi';
import type { MiddlewareHandler, Schema } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { requireAuth, withAuth } from '../middlewares/auth';
import { onError } from '../middlewares/error';
import { auth } from './auth';
import { BASE_PATH, TEST_USER } from './constants';
import type {
  AppEnv,
  AppOpenAPI,
  AppRouteHandler,
  AuthorizedAppRouteHandler,
} from './types';

export function createRouter() {
  return new OpenAPIHono<AppEnv>({
    strict: false,
  });
}

export function createApp({ useLogger = true }: { useLogger?: boolean } = {}) {
  const app = createRouter()
    // Serve static files if path does not start with BASE_PATH
    .use('*', (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }
      return serveStatic({ root: './public' })(c, next);
    })
    .basePath(BASE_PATH) as AppOpenAPI;

  app
    .use(requestId())
    .use(useLogger ? logger() : (_, next) => next())
    .on(['POST', 'GET'], '/auth/*', (c) => {
      return auth.handler(c.req.raw);
    })
    .use(withAuth)
    .use('/notes/*', requireAuth)
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

export function createHandler<R extends RouteConfig>(
  _config: R,
  handler: AppRouteHandler<R>
): AppRouteHandler<R> {
  return handler;
}

export function createAuthorizedHandler<R extends RouteConfig>(
  _config: R,
  handler: AuthorizedAppRouteHandler<R>
): AuthorizedAppRouteHandler<R> {
  return handler;
}

export function createMiddleware(middleware: MiddlewareHandler<AppEnv>) {
  return middleware;
}
