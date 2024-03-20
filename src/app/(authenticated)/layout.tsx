import { Header } from '@/components/Header'
import { SideBar } from '@/components/SideBar'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { unstable_cache as unstableCache } from 'next/cache'

interface AppLayoutProps {
  children: ReactNode
}

const getCurrentUser = unstableCache(
  async () => {
    return await getUser()
  },
  [],
  {
    revalidate: 5,
    tags: ['arenaUser'],
  },
)

export default async function AppLayout({ children }: AppLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }
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
