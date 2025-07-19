import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { buttonVariants } from '@/components/ui/button';
import { authClient } from '@/lib/auth';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = authClient.useSession();
  const isAuthed = !!data?.session.userId;

  return (
    <div className="space-y-8 p-4 pt-20">
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://github.com/aldotestino/hono-openapi-rpc"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className={cn(
              'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 text-sm transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>⭐ Star on GitHub</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </a>
        <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-400/80 bg-clip-text text-center font-semibold text-7xl text-transparent leading-none dark:from-white dark:to-slate-900/10">
          Welcome to Notes
        </h1>
        <p className="max-w-lg text-center text-muted-foreground text-xl">
          A modern monorepo for building full-stack applications with Bun, Hono,
          OpenAPI, and TanStack Router
        </p>
      </div>
      <div className="flex items-center justify-center">
        {isAuthed ? (
          <Link className={buttonVariants({ size: 'lg' })} to="/notes">
            Go to your notes
          </Link>
        ) : (
          <Link className={buttonVariants({ size: 'lg' })} to="/signup">
            Start now!
          </Link>
        )}
      </div>
    </div>
  );
}
