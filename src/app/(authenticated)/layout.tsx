import { Header } from '@/components/Header'
import { SideBar } from '@/components/SideBar'
import { getUser } from '@/lib/auth'
import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { username, arena } = await getUser()
  return (
    <main className="flex flex-col  w-screen h-screen">
      <Header username={username} />
      <div className="grid grid-cols-[1fr] md:grid-cols-[16rem_1fr] w-full">
        <SideBar arena={arena.fantasyName} />

        {children}
      </div>
    </main>
  )
}
