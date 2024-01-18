import React from 'react'
import ThemeToggle from './ThemeToggle/theme-toggle'
import { MobileSidebar } from './mobile-sidebar'
import { cn } from '@/lib/utils'
import { UserNav } from './forms/user-nav'

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className='h-[10vh] border p-4 flex justify-between items-center'>
          <div>
            <h1 className='font-bold text-md md:text-3xl uppercase'>Van Vihar Quiz Dashboard</h1>
          </div>
          <div className='gap-2 items-center flex'>
          <UserNav />
          <ThemeToggle />
          </div>
          <div className={cn("block sm:!hidden")}>
          <MobileSidebar />
        </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar
