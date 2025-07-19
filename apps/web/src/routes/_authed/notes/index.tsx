import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Inbox } from 'lucide-react';
import NoteRow from '@/components/note-row';
import { notesQuery } from '@/lib/api/queries';

export const Route = createFileRoute('/_authed/notes/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(notesQuery),
  component: NotesPage,
});

function NotesPage() {
  const { data } = useSuspenseQuery(notesQuery);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 pt-10 text-muted-foreground">
        <Inbox className="size-10" />
        <p className="font-semibold">No notes yet!</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {data.map((note) => (
        <NoteRow key={note.id} note={note} />
      ))}
    </div>
  );
}
