import { Header } from '@/components/Header'
import { SideBar } from '@/components/SideBar'
import { getUser } from '@/lib/newAuth'
import TypeRouteEnum from '@/types/enum/TypeRouteEnum'
import { redirect } from 'next/navigation'
// import { getUser } from '@/lib/auth'
import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const user = await getUser(TypeRouteEnum.ARENA_ROUTE)

  if (!user) {
    redirect('/')
  }
  console.log(process.env.API_URL)
  const { username, arena, profile } = user
  return (
    <main className="flex flex-col  w-screen h-screen">
      <Header username={username} />
      <div className="grid grid-cols-[1fr] md:grid-cols-[16rem_1fr] w-full">
        <SideBar arena={arena?.fantasyName} currentProfile={profile} />

        {children}
      </div>
    </main>
  )
}
