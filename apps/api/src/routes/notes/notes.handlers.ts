import db from 'db';
import { notes } from 'db/schema';
import { eq } from 'drizzle-orm';
import type { AppRouteHandler } from '../../lib/types';
import type { Create, List, Remove } from './notes.routes';

export const list: AppRouteHandler<List> = async (c) => {
  const allNotes = await db.query.notes.findMany();

  return c.json({ notes: allNotes }, 200);
};

export const create: AppRouteHandler<Create> = async (c) => {
  const note = c.req.valid('json');

  const [createdNote] = await db.insert(notes).values(note).returning();

  return c.json(createdNote, 201);
};

export const remove: AppRouteHandler<Remove> = async (c) => {
  const id = c.req.param('id');
  const parsedId = Number.parseInt(id, 10);

  const [note] = await db.delete(notes).where(eq(notes.id, parsedId)).returning();

  if (!note) {
    c.status(404);
    return c.json({ message: 'Note not found' });
  }

  return c.body(null, 204);
};
