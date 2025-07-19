import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { authClient } from '@/lib/auth';

export const Route = createFileRoute('/_authed')({
  component: AuthedLayout,
});

function AuthedLayout() {
  const { data, isPending } = authClient.useSession();

  if (!(data?.session.userId || isPending)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
