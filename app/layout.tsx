import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Providers from '@/components/providers'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <Providers session={session}> */}
      <Toaster />
      <Navbar />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
      {/* </Providers> */}
      </body>
    </html>
  )
}
