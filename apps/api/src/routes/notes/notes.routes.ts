import { createRoute } from '@hono/zod-openapi';
import { insertNotesSchema, notesSchema } from 'db/schema';
import z from 'zod/v4';

const tags = ['Notes'];

export const list = createRoute({
  path: '/',
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

export const create = createRoute({
  path: '/',
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
  path: '/:id',
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

export type List = typeof list;
export type Create = typeof create;
export type Remove = typeof remove;
