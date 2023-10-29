import { getUser } from '@/lib/auth'
import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { token } = await getUser()
  return (
    <main className="flex flex-col p-10 items-center justify-center gap-7">
      <h1>Logado</h1>
      <div className="flex flex-col p-10 items-center justify-center gap-7">
        <h1 className="font-semibold text-3xl">
          <span className="text-primary">My</span> Arena
        </h1>

        {children}
      </div>
    </main>
  )
}
