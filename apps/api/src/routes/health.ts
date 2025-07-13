import { createRoute } from '@hono/zod-openapi';
import { z } from 'zod/v4';
import { createRouter } from '../lib/create-router';
import type { AppRouteHandler } from '../lib/types';

const tags = ['Health'];

const healthRoute = createRoute({
  path: '/',
  method: 'get',
  tags,
  responses: {
    200: {
      description: 'Health check',
      content: {
        'application/json': {
          schema: z.object({
            status: z.literal('ok'),
          }),
        },
      },
    },
  },
});

const healthHandler: AppRouteHandler<typeof healthRoute> = (c) =>
  c.json({ status: 'ok' });

const router = createRouter().openapi(healthRoute, healthHandler);

export default router;
