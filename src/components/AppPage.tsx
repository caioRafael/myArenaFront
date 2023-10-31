import { ReactNode } from 'react'
import { Title } from './Title'

interface AppPageProps {
  children: ReactNode
  title: string
}

export function AppPage(props: AppPageProps) {
  const { children, title } = props
  return (
    <div className="w-full h-page flex flex-col gap-2 p-10 overflow-scroll">
      <Title title={title} />
      <div className="mt-10 w-full h-full">{children}</div>
    </div>
  )
}
