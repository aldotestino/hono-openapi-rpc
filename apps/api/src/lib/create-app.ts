import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { createRouter } from "./create-router";
import { BASE_PATH } from "./constants";
import type { AppOpenAPI } from "./types";

export function createApp() {
  const app = createRouter()
    .use(requestId())
    .use(logger())
    .basePath(BASE_PATH) as AppOpenAPI;

  return app;
}