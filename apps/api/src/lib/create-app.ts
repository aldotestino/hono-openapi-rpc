import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import type { AppEnv } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppEnv>({
    strict: false,
  });
}

export function createApp() {

  const app = createRouter();
  app
    .use(requestId())
    .use(logger());

  return app;
}