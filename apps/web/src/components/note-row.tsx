import { Button } from '@/components/ui/button';
import { client } from '@/lib/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader, Trash2 } from 'lucide-react';
import type { Note } from 'schema';

type ApiNote = Pick<Note, 'id' | 'title'> & {
  createdAt: string
}

function NoteRow({ note }: { note: ApiNote }) {

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => client.api.notes[':id'].$delete({
      param: {
        id: note.id,
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"]
      });
    }
  });

  
  return (
    <div  className="p-4 border-b flex items-center gap-4 justify-between" >
      <div className='flex items-center gap-4'>
        <span className="text-sm text-muted-foreground" >
          {note.id}
        </span>
        <span>
          {note.title}
        </span>
      </div>
      <Button size="icon" variant="destructive" className='cursor-pointer' onClick={() => mutateAsync()}>
        {isPending ? <Loader className='animate-spin' /> : <Trash2 />}
      </Button>
    </div>
  )
}

export default NoteRow