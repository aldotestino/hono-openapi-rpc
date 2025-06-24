import { createRoute } from "@hono/zod-openapi";
import { insertNoteSchema, noteSchema } from "schema";
import z from "zod/v3";

const tags = ["Notes"]

export const list = createRoute({
  path: "/notes",
  method: "get",
  tags,
  responses: {
    200: {
      description: "All notes",
      content: {
        "application/json": {
          schema: z.object({
            notes: z.array(noteSchema)
          })
        }
      }
    }
  }
});

export const create = createRoute({
  path: "/notes",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertNoteSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: "The created note",
      content: {
        "application/json": {
          schema: noteSchema
        }
      }
    }
  }
});

export type List = typeof list;
export type Create = typeof create;