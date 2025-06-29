import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';

export type AppEnv = {
  // biome-ignore lint/complexity/noBannedTypes: this is a placeholder for env variables
  Bindings: {};
};

export type AppOpenAPI = OpenAPIHono<AppEnv>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>;
