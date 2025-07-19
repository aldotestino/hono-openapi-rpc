import { describe, expect, test } from 'bun:test';
import type { Note } from 'db/schema';
import { getNotesByPeriod } from './utils';

describe('🔧 Utils', () => {
  describe('getNotesByPeriod', () => {
    const createMockNote = (
      id: number,
      createdAt: Date,
      title = 'Test Note',
      description = 'Test Description'
    ): Note => ({
      id,
      userId: 'test-user',
      title,
      description,
      createdAt,
    });

    test('should group notes by day correctly', () => {
      const notes: Note[] = [
        createMockNote(1, new Date('2024-01-15T10:00:00Z')),
        createMockNote(2, new Date('2024-01-15T14:00:00Z')),
        createMockNote(3, new Date('2024-01-16T10:00:00Z')),
        createMockNote(4, new Date('2024-01-17T10:00:00Z')),
      ];

      const result = getNotesByPeriod(notes, 'day');

      expect(result).toHaveLength(3);
      expect(result).toContainEqual({ period: 'Jan 15', notes: 2 });
      expect(result).toContainEqual({ period: 'Jan 16', notes: 1 });
      expect(result).toContainEqual({ period: 'Jan 17', notes: 1 });
    });

    test('should group notes by week correctly', () => {
      const notes: Note[] = [
        createMockNote(1, new Date('2024-01-15T10:00:00Z')), // Week 3
        createMockNote(2, new Date('2024-01-16T10:00:00Z')), // Week 3
        createMockNote(3, new Date('2024-01-22T10:00:00Z')), // Week 4
        createMockNote(4, new Date('2024-01-29T10:00:00Z')), // Week 5
      ];

      const result = getNotesByPeriod(notes, 'week');

      expect(result).toHaveLength(3);
      expect(result).toContainEqual({ period: 'Week 3', notes: 2 });
      expect(result).toContainEqual({ period: 'Week 4', notes: 1 });
      expect(result).toContainEqual({ period: 'Week 5', notes: 1 });
    });

    test('should group notes by month correctly', () => {
      const notes: Note[] = [
        createMockNote(1, new Date('2024-01-15T10:00:00Z')),
        createMockNote(2, new Date('2024-01-20T10:00:00Z')),
        createMockNote(3, new Date('2024-02-15T10:00:00Z')),
        createMockNote(4, new Date('2024-03-15T10:00:00Z')),
      ];

      const result = getNotesByPeriod(notes, 'month');

      expect(result).toHaveLength(3);
      expect(result).toContainEqual({ period: 'Jan', notes: 2 });
      expect(result).toContainEqual({ period: 'Feb', notes: 1 });
      expect(result).toContainEqual({ period: 'Mar', notes: 1 });
    });

    test('should group notes by year correctly', () => {
      const notes: Note[] = [
        createMockNote(1, new Date('2024-01-15T10:00:00Z')),
        createMockNote(2, new Date('2024-06-15T10:00:00Z')),
        createMockNote(3, new Date('2023-01-15T10:00:00Z')),
        createMockNote(4, new Date('2025-01-15T10:00:00Z')),
      ];

      const result = getNotesByPeriod(notes, 'year');

      expect(result).toHaveLength(3);
      expect(result).toContainEqual({ period: '2024', notes: 2 });
      expect(result).toContainEqual({ period: '2023', notes: 1 });
      expect(result).toContainEqual({ period: '2025', notes: 1 });
    });

    test('should handle empty notes array', () => {
      const notes: Note[] = [];
      const result = getNotesByPeriod(notes, 'day');

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    test('should handle single note', () => {
      const notes: Note[] = [
        createMockNote(1, new Date('2024-01-15T10:00:00Z')),
      ];

      const result = getNotesByPeriod(notes, 'day');

      expect(result).toHaveLength(1);
      expect(result).toEqual([{ period: 'Jan 15', notes: 1 }]);
    });

    test('should handle notes with same period', () => {
      const notes: Note[] = [
        createMockNote(1, new Date('2024-01-15T10:00:00Z')),
        createMockNote(2, new Date('2024-01-15T14:00:00Z')),
        createMockNote(3, new Date('2024-01-15T18:00:00Z')),
      ];

      const result = getNotesByPeriod(notes, 'day');

      expect(result).toHaveLength(1);
      expect(result).toEqual([{ period: 'Jan 15', notes: 3 }]);
    });
  });
});
