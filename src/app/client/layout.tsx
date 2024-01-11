// import Link from 'next/link'
import { getUser } from '@/lib/newAuth'
import TypeRouteEnum from '@/types/enum/TypeRouteEnum'
import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export default async function ClientLayout({ children }: AppLayoutProps) {
  const user = await getUser(TypeRouteEnum.CLIENT_ROUTE)
  return (
    <main className="flex flex-col  w-screen h-screen">
      <header className="w-full h-20 flex items-center justify-between p-4 border-b border-border bg-primary">
        <h1 className="font-semibold text-3xl">
          <span className="text-white">My</span> Arena
        </h1>

        {user && <h1>{user.username}</h1>}
        {/* <Link href={'/'}>Login</Link> */}
      </header>
      <div className="w-full h-page">{children}</div>
    </main>
  )
}
