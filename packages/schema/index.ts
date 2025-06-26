import { z } from "zod/v3";

export const noteSchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  createdAt: z.date()
});

export const insertNoteSchema = noteSchema.omit({ id: true, createdAt: true });

export type Note = z.infer<typeof noteSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;