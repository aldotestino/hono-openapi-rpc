import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
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
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-2 p-4">
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold text-lg">{note.title}</p>
          <Button
            className="cursor-pointer"
            onClick={() => mutateAsync()}
            size="icon"
            variant="ghost"
          >
            {isPending ? <Loader className="animate-spin" /> : <Trash2 />}
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          {format(new Date(note.createdAt), 'MMM d, yyyy')}
        </p>
      </div>
      <p className="text-lg">{note.description}</p>
    </div>
  );
}

export default NoteRow;
