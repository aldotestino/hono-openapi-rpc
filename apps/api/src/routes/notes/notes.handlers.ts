import db from 'db';
import { notes } from 'db/schema';
import { and, eq } from 'drizzle-orm';
import { createAuthorizedHandler } from '../../lib/factory';
import {
  create as createRoute,
  list as listRoute,
  remove as removeRoute,
} from './notes.routes';

export const list = createAuthorizedHandler(listRoute, async (c) => {
  const user = c.get('user');

  const allNotes = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, user.id));

  return c.json({ notes: allNotes }, 200);
});

export const create = createAuthorizedHandler(createRoute, async (c) => {
  const note = c.req.valid('json');

  const user = c.get('user');

  const [createdNote] = await db
    .insert(notes)
    .values({
      ...note,
      userId: user.id,
    })
    .returning();

  return c.json(createdNote, 201);
});

export const remove = createAuthorizedHandler(removeRoute, async (c) => {
  const id = c.req.param('id');
  const parsedId = Number.parseInt(id, 10);

  const user = c.get('user');

  const [note] = await db
    .delete(notes)
    .where(and(eq(notes.id, parsedId), eq(notes.userId, user.id)))
    .returning();

  if (!note) {
    c.status(404);
    return c.json({ message: 'Note not found' });
  }

  return c.body(null, 204);
});
