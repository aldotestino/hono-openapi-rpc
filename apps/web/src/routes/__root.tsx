import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'
import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/header.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div className='h-screen w-full max-w-screen-lg mx-auto grid grid-rows-[auto_1fr] overflow-y-hidden'>
        <Header />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
})
