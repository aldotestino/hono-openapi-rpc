import { createFileRoute, Link, Navigate } from '@tanstack/react-router';
import CredentialsAuth from '@/components/credentials-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = authClient.useSession();

  if (data?.session.userId) {
    return <Navigate to="/notes" />;
  }

  return (
    <div className="p-4 pt-10">
      <div className="mx-auto max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign up to your account</CardTitle>
            <CardDescription>
              Enter your email below to sign up to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <CredentialsAuth signup />
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link className="underline underline-offset-4" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
