import { describe, expect, test } from 'bun:test';
import { testClient } from 'hono/testing';
import { createApp } from './lib/create-app';
import { registerRoutes } from './routes';

describe('Api tests', () => {
  const app = registerRoutes(createApp({ useLogger: false }));
  const client = testClient(app);

  describe('❤️ health', () => {
    test('should return a health check', async () => {
      const response = await client.api.health.$get();
      const { status } = await response.json();
      expect(response.status).toBe(200);
      expect(status).toBe('ok');
    });
  });

  describe('🗒️ notes', () => {
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

    test('should delete a note', async () => {
      const response = await client.api.notes[':id'].$delete({
        param: { id: createdNoteId.toString() },
      });

      expect(response.status).toBe(204);
    });
  });
});
