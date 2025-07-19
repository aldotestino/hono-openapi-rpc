import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { format } from 'date-fns';
import db from 'db';
import { user } from 'db/schema';
import { eq } from 'drizzle-orm';
import { testClient } from 'hono/testing';
import { TEST_USER } from '../../lib/constants';
import { createTestApp } from '../../lib/factory';
import notesRouter from './notes.index';

beforeAll(async () => {
  await db.insert(user).values(TEST_USER);
});

afterAll(async () => {
  await db.delete(user).where(eq(user.id, TEST_USER.id));
});

describe('🗒️ Notes', () => {
  const client = testClient(createTestApp(notesRouter));

  let createdNoteId: number;

  test('should return a list of notes', async () => {
    const response = await client.api.notes.$get();
    const { notes } = await response.json();

    expect(response.status).toBe(200);
    expect(notes).toBeArray();
  });

  test('should create a new note', async () => {
    const response = await client.api.notes.$post({
      json: {
        title: 'Test note',
        description: 'Test description',
      },
    });
    const { id } = await response.json();
    createdNoteId = id;

    expect(response.status).toBe(201);
    expect(id).toBeNumber();
  });

  test('verify new note is in the list', async () => {
    const response = await client.api.notes.$get();
    const { notes } = await response.json();

    expect(notes.map((note) => note.id)).toContain(createdNoteId);
  });

  test('verify stats are correct', async () => {
    const response = await client.api.notes.stats.$get({
      query: {
        granularity: 'day',
      },
    });
    const { stats, total } = await response.json();

    const period = format(new Date(), 'MMM d');

    expect(response.status).toBe(200);
    expect(stats).toBeArray();
    expect(stats).toContainEqual({
      period,
      notes: 1,
    });
    expect(total).toBe(1);
  });

  test('should delete a note', async () => {
    const response = await client.api.notes[':id'].$delete({
      param: { id: createdNoteId.toString() },
    });

    expect(response.status).toBe(204);
  });
});
