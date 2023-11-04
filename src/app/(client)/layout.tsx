import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export default async function ClientLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex flex-col  w-screen h-screen">
      <header className="flex items-center justify-center w-full h-14 bg-primary">
        <h1 className="font-semibold text-3xl">
          <span className="text-white">My</span> Arena
        </h1>
      </header>
      <div className="w-full h-page">{children}</div>
    </main>
  )
}
