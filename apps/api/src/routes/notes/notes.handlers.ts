import db from 'db';
import { notes } from 'db/schema';
import { eq } from 'drizzle-orm';
import { createHandler } from '../../lib/factory';
import {
  create as createRoute,
  list as listRoute,
  remove as removeRoute,
} from './notes.routes';

export const list = createHandler(listRoute, async (c) => {
  const allNotes = await db.query.notes.findMany();

  return c.json({ notes: allNotes }, 200);
});

export const create = createHandler(createRoute, async (c) => {
  const note = c.req.valid('json');

  const [createdNote] = await db.insert(notes).values(note).returning();

  return c.json(createdNote, 201);
});

export const remove = createHandler(removeRoute, async (c) => {
  const id = c.req.param('id');
  const parsedId = Number.parseInt(id, 10);

  const [note] = await db
    .delete(notes)
    .where(eq(notes.id, parsedId))
    .returning();

  if (!note) {
    c.status(404);
    return c.json({ message: 'Note not found' });
  }

  return c.body(null, 204);
});
