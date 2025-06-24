import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { BASE_PATH } from "./constants";

export type AppEnv = {
  Bindings: {};
};

export type AppOpenAPI = OpenAPIHono<AppEnv, {}, typeof BASE_PATH>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>;