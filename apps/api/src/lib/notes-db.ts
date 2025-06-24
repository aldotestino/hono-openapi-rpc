import type { InsertNote, Note } from "schema";

class NotesDB {
  private notes: Note[] = [];

  list() {
    return this.notes;
  }

  create(note: InsertNote) {

    const newNote = {
      title: note.title,
      createdAt: new Date()
    }

    this.notes.push(newNote);

    return newNote;
  }
}

export const notesDB = new NotesDB();