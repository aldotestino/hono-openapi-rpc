import NoteRow from '@/components/note-row'
import { notesQuery } from '@/lib/api/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Inbox, Loader } from 'lucide-react'

export const Route = createFileRoute('/')({
  loader: ({context: {queryClient}}) => queryClient.ensureQueryData(notesQuery),
  component: App,
  pendingComponent: () => <div className='h-full flex flex-col items-center justify-center gap-2 text-muted-foreground'>
    <Loader className='size-10 animate-spin' />
    <p className='font-semibold'>Loading notes...</p>
  </div>
})

function App() {

  const { data } = useSuspenseQuery(notesQuery)

  if(data.length === 0) {

    return (
      <div className='h-full flex flex-col items-center justify-center gap-2 text-muted-foreground'>
        <Inbox className='size-10' />
        <p className='font-semibold'>No notes yet!</p>
      </div>
    )
  }

  return (
    <div className='h-full overflow-y-auto'>
      {data.map(note => (
        <NoteRow key={note.id} note={note} />
      ))}
    </div>
  );
}
