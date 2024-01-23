import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import '@/app/global.css'

import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Van Vihar Quiz Dashborad',
  description: 'Developed by...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <>
    <Navbar />
    <div className="flex h-screen ">
      <Sidebar />
      <main className="w-full pt-8">{children}</main>
    </div>
  </>
  )
}
