import Image from 'next/image'
import { ReactNode } from 'react'

import InitialImage from '@/assets/Inital-page-image.svg'
import SecondaryLogo from '@/assets/SecondaryLogo.svg'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await getServerSession(nextAuthOptions)

  if (session) redirect('/home')
  return (
    <main className="grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] w-screen min-h-screen">
      <div className="hidden md:flex w-full h-full items-center justify-center">
        <Image
          height={1000}
          width={600}
          src={InitialImage}
          alt="Inital image"
        />
      </div>
      <div className="flex flex-col p-10 items-center justify-center gap-7">
        <Image
          width={300}
          height={100}
          src={SecondaryLogo}
          alt="Logotype connect sport"
        />

        {children}
      </div>
    </main>
  )
}
