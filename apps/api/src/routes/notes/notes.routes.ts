import { createRoute } from '@hono/zod-openapi';
import { insertNotesSchema, notesSchema } from 'db/schema';
import z from 'zod/v4';
import { granularitySchema, statsSchema } from '../../lib/utils';

const tags = ['Notes'];
const basePath = '/notes';

export const list = createRoute({
  path: basePath,
  method: 'get',
  tags,
  responses: {
    200: {
      description: 'All notes',
      content: {
        'application/json': {
          schema: z.object({
            notes: z.array(notesSchema),
          }),
        },
      },
    },
  },
});

export const stats = createRoute({
  path: `${basePath}/stats`,
  method: 'get',
  tags,
  request: {
    query: z.object({
      granularity: granularitySchema,
    }),
  },
  responses: {
    200: {
      description: 'Notes stats',
      content: {
        'application/json': {
          schema: z.object({
            stats: z.array(statsSchema),
            total: z.number(),
          }),
        },
      },
    },
  },
});

export const create = createRoute({
  path: basePath,
  method: 'post',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertNotesSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'The created note',
      content: {
        'application/json': {
          schema: notesSchema,
        },
      },
    },
  },
});

export const remove = createRoute({
  path: `${basePath}/:id`,
  method: 'delete',
  tags,
  request: {
    params: z.object({
      id: z.coerce.number().int().positive(),
    }),
  },
  responses: {
    204: {
      description: 'The note was deleted',
    },
    404: {
      description: 'The note was not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});
