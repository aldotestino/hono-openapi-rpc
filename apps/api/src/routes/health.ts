import { createRoute } from '@hono/zod-openapi';
import { z } from 'zod/v4';
import { STATUS_OK } from '../lib/constants';
import { createRouter } from '../lib/factory';
import type { AppRouteHandler } from '../lib/types';

const tags = ['Health'];
const basePath = '/health';

const healthRoute = createRoute({
  path: basePath,
  method: 'get',
  tags,
  responses: {
    200: {
      description: 'Health check',
      content: {
        'application/json': {
          schema: z.object({
            status: z.literal(STATUS_OK),
          }),
        },
      },
    },
  },
});

const healthHandler: AppRouteHandler<typeof healthRoute> = (c) =>
  c.json({ status: STATUS_OK });

const router = createRouter().openapi(healthRoute, healthHandler);

export default router;
