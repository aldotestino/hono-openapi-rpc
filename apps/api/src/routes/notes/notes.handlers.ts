import type { Create, List, Remove } from "./notes.routes";
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

export const remove: AppRouteHandler<Remove> = async (c) => {
  const id = c.req.param("id");

  const res = notesDB.delete(Number(id));

  if (!res) {
    c.status(404)
    return c.json({ message: "Note not found" });
  }

  return c.body(null, 204);
}