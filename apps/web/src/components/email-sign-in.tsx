import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth';

const emailSignInSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
});

type EmailSignIn = z.infer<typeof emailSignInSchema>;

function EmailSignIn({ signup = false }: { signup?: boolean }) {
  const form = useForm({
    resolver: zodResolver(emailSignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  function onSubmit(values: EmailSignIn) {
    if (signup) {
      authClient.signUp.email(
        {
          ...values,
          name: '',
        },
        {
          onSuccess: () => {
            router.navigate({ to: '/notes' });
          },
          onError: (error) => {
            alert(error.error.message);
          },
        }
      );
      return;
    }
    authClient.signIn.email(values, {
      onSuccess: () => {
        router.navigate({ to: '/notes' });
      },
      onError: (error) => {
        alert(error.error.message);
      },
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                {/* <a
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                      href="#"
                    >
                      Forgot your password?
                    </a> */}
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {signup ? 'Sign up' : 'Sign in'}
        </Button>
      </form>
    </Form>
  );
}

export default EmailSignIn;
