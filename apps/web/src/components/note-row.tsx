import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from 'db/schema';
import { Loader, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/api/client';

function NoteRow({
  note,
}: {
  note: Omit<Note, 'createdAt'> & { createdAt: string };
}) {
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
    <div className="mx-auto max-w-5xl space-y-2 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">{note.id}</span>
          <span className="font-semibold text-lg">{note.title}</span>
        </p>
        <Button
          className="cursor-pointer"
          onClick={() => mutateAsync()}
          size="icon"
          variant="ghost"
        >
          {isPending ? <Loader className="animate-spin" /> : <Trash2 />}
        </Button>
      </div>
      <p className="text-muted-foreground">{note.description}</p>
    </div>
  );
}

export default NoteRow;
