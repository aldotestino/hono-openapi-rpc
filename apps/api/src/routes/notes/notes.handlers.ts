import type { Create, List } from "./notes.routes";
import { notesDB } from "../../lib/notes-db";
import type { AppRouteHandler } from "../../lib/types";

export const list: AppRouteHandler<List> = async (c) => {
  const notes = notesDB.list();

  return c.json({ notes }, 200);
}

export const create: AppRouteHandler<Create> = async (c) => {
  const note = c.req.valid("json");

  const createdNote = notesDB.create(note);

  return c.json(createdNote, 201);
}