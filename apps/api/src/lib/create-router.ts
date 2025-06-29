import { OpenAPIHono } from '@hono/zod-openapi';
import type { AppEnv } from './types';

export function createRouter() {
  return new OpenAPIHono<AppEnv>({
    strict: false,
  });
}
