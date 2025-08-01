import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { type InsertNote, insertNotesSchema } from 'db/schema';
import { ArrowLeft, Loader, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { client } from '@/lib/api/client';

export const Route = createFileRoute('/_authed/notes/new')({
  component: NewNotePage,
});

function NewNotePage() {
  const form = useForm<InsertNote>({
    resolver: zodResolver(insertNotesSchema),
    defaultValues: {
      title: '',
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: InsertNote) =>
      client.api.notes.$post({
        json: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      router.navigate({
        to: '/notes',
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  function onSubmit(data: InsertNote) {
    mutateAsync(data);
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>New Note</CardTitle>
              <CardDescription>
                Create a new note to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your note here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => router.navigate({ to: '/notes' })}
                  type="button"
                  variant="outline"
                >
                  <ArrowLeft />
                  Back
                </Button>
                <Button
                  className="cursor-pointer"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? <Loader className="animate-spin" /> : <Plus />}
                  Create Note
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
