import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader, Trash2 } from 'lucide-react';
import type { Note } from 'schema';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/api/client';

type ApiNote = Pick<Note, 'id' | 'title'> & {
  createdAt: string;
};

function NoteRow({ note }: { note: ApiNote }) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      client.api.notes[':id'].$delete({
        param: {
          id: note.id,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  return (
    <div className="flex items-center justify-between gap-4 border-b p-4">
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground text-sm">{note.id}</span>
        <span>{note.title}</span>
      </div>
      <Button
        className="cursor-pointer"
        onClick={() => mutateAsync()}
        size="icon"
        variant="destructive"
      >
        {isPending ? <Loader className="animate-spin" /> : <Trash2 />}
      </Button>
    </div>
  );
}

export default NoteRow;
