import { beforeEach, describe, expect, it } from "bun:test";
import { NotesDB } from "./notes-db";

describe("NotesDB", () => {
  let notesDB: NotesDB;

  beforeEach(() => {
    notesDB = new NotesDB();
  });

  it("should start with empty notes list", () => {
    expect(notesDB.list()).toBeArrayOfSize(0);
  });

  it("should create notes with auto-incrementing IDs", () => {
    const note1 = notesDB.create({ title: "Test Note 1" });
    const note2 = notesDB.create({ title: "Test Note 2" });

    expect(note1).toEqual({
      id: 1,
      title: "Test Note 1",
      createdAt: expect.any(Date),
    });
    expect(note2.id).toBe(2);
    expect(notesDB.list()).toBeArrayOfSize(2);
  });

  it("should delete existing notes and return true", () => {
    const note = notesDB.create({ title: "Test Note" });
    expect(notesDB.delete(note.id)).toBe(true);
    expect(notesDB.list()).toBeArrayOfSize(0);
  });

  it("should return false when deleting non-existent note", () => {
    expect(notesDB.delete(999)).toBe(false);
  });

  it("should continue incrementing IDs after deleting notes", () => {
    const note1 = notesDB.create({ title: "Test Note 1" });
    const note2 = notesDB.create({ title: "Test Note 2" });

    expect(note1.id).toBe(1);
    expect(note2.id).toBe(2);

    notesDB.delete(note1.id);

    const note3 = notesDB.create({ title: "Test Note 3" });
    expect(note3.id).toBe(3);
  });
});