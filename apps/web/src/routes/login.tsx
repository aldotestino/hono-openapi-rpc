import { createFileRoute, Link } from '@tanstack/react-router';
import { FaGithub } from 'react-icons/fa';
import CredentialsAuth from '@/components/credentials-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4 pt-10">
      <div className="mx-auto max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <CredentialsAuth />
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button
                className="w-full"
                onClick={() => authClient.signIn.social({ provider: 'github' })}
                variant="outline"
              >
                <FaGithub />
                Login with GitHub
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link className="underline underline-offset-4" to="/signup">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
