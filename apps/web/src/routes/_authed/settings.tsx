import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { KeyRound } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth';

export const Route = createFileRoute('/_authed/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = authClient.useSession();

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="size-32">
          <AvatarImage src={data?.user.image || undefined} />
          <AvatarFallback className="font-semibold text-4xl">
            {data?.user.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <h2 className="font-semibold text-4xl">{data?.user.name}</h2>
          <p className="text-lg text-muted-foreground">{data?.user.email}</p>
        </div>
      </div>
      <div className="mx-auto max-w-lg space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Connector</p>
          {data?.provider === 'github' ? (
            <div className="flex items-center gap-1">
              <FaGithub className="size-4" />
              <p className="font-semibold">GitHub</p>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <KeyRound className="size-4" />
              <p className="font-semibold">Credentials</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Joined On</p>
          <div className="flex items-center gap-1">
            <p className="font-semibold">
              {format(data?.user.createdAt || new Date(), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
