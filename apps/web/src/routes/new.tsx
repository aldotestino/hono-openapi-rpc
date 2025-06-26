import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { insertNoteSchema, type InsertNote } from "schema"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { client } from '@/lib/api/client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader, Plus } from 'lucide-react'

export const Route = createFileRoute('/new')({
  component: NewNoteComponent,
})

function NewNoteComponent() {

  const form = useForm<InsertNote>({
    resolver: zodResolver(insertNoteSchema),
    defaultValues: {
      title: "",
    }
  });

  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: InsertNote) => client.api.notes.$post({
      json: data,
    }),
    onSuccess: () => {
      router.navigate({
        to: "/",
      });
    }
  });

  function onSubmit(data: InsertNote) {
    mutateAsync(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>New Note</CardTitle>
            <CardDescription>
              Create a new note to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Write your note here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button type="submit" disabled={isPending} className='cursor-pointer'>
              {isPending ? <Loader className='animate-spin' /> : <Plus />}
              Create Note
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
