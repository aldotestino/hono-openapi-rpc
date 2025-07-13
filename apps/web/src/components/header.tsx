import { Link, useLocation } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import UserMenu from '@/components/user-menu';
import { authClient } from '@/lib/auth';

function Header() {
  const { pathname } = useLocation();

  const { data } = authClient.useSession();

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        {pathname === '/notes/new' && (
          <Link
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'h-8 w-8',
            })}
            to="/notes"
          >
            <ArrowLeftIcon />
          </Link>
        )}
        <h1 className="font-bold text-2xl">Notes</h1>
      </div>
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
        {data?.session.userId && <UserMenu />}
      </div>
    </header>
  );
}

export default Header;
