import { z } from "zod/v3";

export const noteSchema = z.object({
  title: z.string(),
  createdAt: z.date()
});

export const insertNoteSchema = noteSchema.omit({ createdAt: true });

export type Note = z.infer<typeof noteSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;