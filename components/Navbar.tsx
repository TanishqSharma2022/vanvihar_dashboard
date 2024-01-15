import React from 'react'
import ThemeToggle from './ThemeToggle/theme-toggle'
import { MobileSidebar } from './mobile-sidebar'
import { cn } from '@/lib/utils'

const Navbar = () => {
  return (
    <div>
        <div className='h-[10vh] border p-4 flex justify-between items-center'>
          <div>
            <h1 className='font-bold text-md md:text-3xl uppercase'>Van Vihar Quiz Dashboard</h1>
          </div>
          {/* <ThemeToggle /> */}
          <div className={cn("block sm:!hidden")}>
          <MobileSidebar />
        </div>
        </div>
    </div>
  )
}

export default Navbar
