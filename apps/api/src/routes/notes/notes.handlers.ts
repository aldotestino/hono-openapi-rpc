import db from 'db';
import { notes } from 'db/schema';
import { and, asc, desc, eq, gte } from 'drizzle-orm';
import type { AppRouteHandler } from '../../lib/types';
import { getNotesByPeriod, getPeriodStart } from '../../lib/utils';
import type {
  create as createRoute,
  list as listRoute,
  remove as removeRoute,
  stats as statsRoute,
} from './notes.routes';

export const list: AppRouteHandler<typeof listRoute> = async (c) => {
  const user = c.get('user');

  const allNotes = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, user.id))
    .orderBy(desc(notes.createdAt));

  return c.json({ notes: allNotes }, 200);
};

export const stats: AppRouteHandler<typeof statsRoute> = async (c) => {
  const { granularity } = c.req.valid('query');
  const user = c.get('user');

  const from = getPeriodStart(granularity);

  const notesInPeriod = await db
    .select()
    .from(notes)
    .where(and(eq(notes.userId, user.id), gte(notes.createdAt, from)))
    .orderBy(asc(notes.createdAt));

  const notesByPeriod = getNotesByPeriod(notesInPeriod, granularity);

  return c.json({ stats: notesByPeriod }, 200);
};

export const create: AppRouteHandler<typeof createRoute> = async (c) => {
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
};

export const remove: AppRouteHandler<typeof removeRoute> = async (c) => {
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
};
