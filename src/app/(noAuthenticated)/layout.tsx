import Image from 'next/image'
import { ReactNode } from 'react'

import InitialImage from '@/assets/Inital-page-image.svg'

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
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
        <h1 className="font-semibold text-3xl">
          <span className="text-primary">My</span> Arena
        </h1>

        {children}
      </div>
    </main>
  )
}
