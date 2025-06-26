import { buttonVariants } from '@/components/ui/button'
import { Link, useLocation } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

function Header() {

  const {pathname} = useLocation()

  return (
    <header className='flex items-center justify-between p-4 border-b'>
      <div className='flex items-center gap-2'>
        {pathname === "/new" && 
          <Link to="/" className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
            <ArrowLeftIcon className='w-4 h-4' />
          </Link>
        }
        <h1 className='text-2xl font-bold'>Notes</h1>
      </div>
      {pathname !== "/new" && 
        <Link to="/new" className={buttonVariants({ variant: 'outline', className: 'ml-auto' })}>
          New Note
        </Link>
      }
    </header>
  )
}

export default Header