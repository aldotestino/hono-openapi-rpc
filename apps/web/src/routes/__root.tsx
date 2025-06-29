import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '@/components/header.tsx';
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div className="mx-auto grid h-screen w-full max-w-screen-lg grid-rows-[auto_1fr] overflow-y-hidden">
        <Header />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
});
