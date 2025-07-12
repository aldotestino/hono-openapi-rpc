import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod/v4';

export const notes = pgTable('notes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const notesSchema = createSelectSchema(notes, {
  title: (schema) => schema.min(1, 'Title must be at least 1 character'),
  description: (schema) =>
    schema.min(1, 'Description must be at least 1 character'),
});

export const insertNotesSchema = notesSchema.omit({
  createdAt: true,
  id: true,
});

export type Note = z.infer<typeof notesSchema>;
export type InsertNote = z.infer<typeof insertNotesSchema>;
