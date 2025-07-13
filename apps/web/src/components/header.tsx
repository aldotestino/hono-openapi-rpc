import { Link, useLocation, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { authClient } from '@/lib/auth';

function Header() {
  const { pathname } = useLocation();
  const router = useRouter();

  const { data } = authClient.useSession();

  const handleSignOut = () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.navigate({ to: '/' });
        },
      },
    });

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        {pathname === '/notes/new' && (
          <Link
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            to="/notes"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        )}
        <h1 className="font-bold text-2xl">Notes</h1>
      </div>
      <div className="flex items-center gap-2">
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
        {data?.session.userId && (
          <Button onClick={handleSignOut} size="sm" variant="outline">
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
