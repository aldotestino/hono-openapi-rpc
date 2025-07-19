import { Link, useLocation } from '@tanstack/react-router';
import { buttonVariants } from '@/components/ui/button';
import UserMenu from '@/components/user-menu';
import { authClient } from '@/lib/auth';

function Header() {
  const { pathname } = useLocation();

  const { data } = authClient.useSession();

  return (
    <header className="sticky top-0 z-10 border-b bg-background/60 shadow-xs backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link to="/">
          <h1 className="font-bold text-2xl">Notes</h1>
        </Link>
        <div className="flex items-center gap-4">
          {pathname === '/notes' && (
            <Link
              className={buttonVariants({
                variant: 'outline',
                className: 'ml-auto',
                size: 'sm',
              })}
              to="/notes/new"
            >
              New Note
            </Link>
          )}
          {data?.session.userId ? (
            <UserMenu />
          ) : (
            <Link
              className={buttonVariants({ variant: 'outline' })}
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
