import { Link, useLocation } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        {pathname === '/new' && (
          <Link
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            to="/"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        )}
        <h1 className="font-bold text-2xl">Notes</h1>
      </div>
      {pathname !== '/new' && (
        <Link
          className={buttonVariants({
            variant: 'outline',
            className: 'ml-auto',
          })}
          to="/new"
        >
          New Note
        </Link>
      )}
    </header>
  );
}

export default Header;
