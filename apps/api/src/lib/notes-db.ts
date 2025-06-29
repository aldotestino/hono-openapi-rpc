import type { InsertNote, Note } from 'schema';

class NotesDB {
  private notes: Note[] = [];
  private nextId = 1;

  list() {
    return this.notes;
  }

  create(note: InsertNote) {
    const newNote = {
      id: this.nextId++,
      title: note.title,
      createdAt: new Date(),
    };

    this.notes.push(newNote);

    return newNote;
  }

  delete(id: number) {
    const prevLength = this.notes.length;

    this.notes = this.notes.filter((note) => note.id !== id);

    if (prevLength === this.notes.length) {
      return false;
    }

    return true;
  }
}

export const notesDB = new NotesDB();
