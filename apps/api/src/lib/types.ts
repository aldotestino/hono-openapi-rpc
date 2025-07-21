import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { Schema } from 'hono';
import type { auth } from './auth';
import type { BASE_PATH } from './constants';

export type AppEnv = {
  // biome-ignore lint/complexity/noBannedTypes: this is a placeholder for bindings
  Bindings: {};
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};

export type AppOpenAPI<
  // biome-ignore lint/complexity/noBannedTypes: this is needed for the rpc client types
  S extends Schema = {},
> = OpenAPIHono<AppEnv, S, typeof BASE_PATH>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>;
