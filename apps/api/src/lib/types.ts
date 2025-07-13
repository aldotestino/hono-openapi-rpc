import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { Schema } from 'hono';
import type { auth } from './auth';
import type { BASE_PATH } from './constants';

export type AppEnv = {
  // biome-ignore lint/complexity/noBannedTypes: this is a placeholder for bindings
  Bindings: {};
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

// Environment for authorized routes where user and session are guaranteed to be non-null
export type AuthorizedAppEnv = {
  Bindings: AppEnv['Bindings'];
  Variables: {
    user: NonNullable<typeof auth.$Infer.Session.user>;
    session: NonNullable<typeof auth.$Infer.Session.session>;
  };
};

// biome-ignore lint/complexity/noBannedTypes: this is needed for the rpc client types
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<
  AppEnv,
  S,
  typeof BASE_PATH
>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>;

export type AuthorizedAppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AuthorizedAppEnv
>;
