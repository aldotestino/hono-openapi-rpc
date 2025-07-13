import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { authClient } from '@/lib/auth';

export const Route = createFileRoute('/_authed')({
  component: AuthedLayout,
});

function AuthedLayout() {
  const { data } = authClient.useSession();

  if (!data?.session.userId) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
