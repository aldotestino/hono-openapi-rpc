import { OpenAPIHono, type RouteConfig } from '@hono/zod-openapi';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import type { MiddlewareHandler } from 'hono/types';
import { auth } from './auth';
import { BASE_PATH } from './constants';
import type { AppEnv, AppOpenAPI, AppRouteHandler } from './types';

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
    .use(requestId())
    .use(useLogger ? logger() : (_, next) => next())
    .on(['POST', 'GET'], `${BASE_PATH}/auth/*`, (c) => {
      return auth.handler(c.req.raw);
    })
    .basePath(BASE_PATH) as AppOpenAPI;

  return app;
}

export function createHandler<R extends RouteConfig>(
  _config: R,
  handler: AppRouteHandler<R>
): AppRouteHandler<R> {
  return handler;
}

export function createMiddleware(middleware: MiddlewareHandler<AppEnv>) {
  return middleware;
}
