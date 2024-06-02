import { Header } from '@/components/Header'
import { SideBar } from '@/components/SideBar'
import { getUser } from '@/lib/auth'
import { UserProfileEnum } from '@/types/User'
import { redirect } from 'next/navigation'
import { ReactNode, Suspense } from 'react'
import LoadingPages from './loading'

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const user = await getUser()

  if (!user) {
    redirect('/')
  }
  const { name, arena, profile } = user
  return (
    <main className="flex flex-col  w-screen h-screen">
      <Header username={name} />
      <div className="grid grid-cols-[1fr] md:grid-cols-[16rem_1fr] w-full">
        <SideBar
          arena={arena?.fantasyName}
          currentProfile={profile as UserProfileEnum}
        />
        <Suspense fallback={<LoadingPages />}>{children}</Suspense>
      </div>
    </main>
  )
}
