import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { BASE_PATH } from './constants';

export type AppEnv = {
  // biome-ignore lint/complexity/noBannedTypes: this is a placeholder for env variables
  Bindings: {};
};

// biome-ignore lint/complexity/noBannedTypes: this is needed for the rpc client types
export type AppOpenAPI = OpenAPIHono<AppEnv, {}, typeof BASE_PATH>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>;
