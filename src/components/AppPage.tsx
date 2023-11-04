import { ReactElement, ReactNode } from 'react'
import { Title } from './Title'

interface AppPageProps {
  children: ReactNode
  title: string
  topRightContainer?: ReactElement
}

export function AppPage(props: AppPageProps) {
  const { children, title, topRightContainer } = props
  return (
    <div className="w-full h-page flex flex-col gap-2 p-10 overflow-scroll">
      <div className="flex items-center justify-between">
        <Title title={title} />
        {topRightContainer}
      </div>
      <div className="mt-10 w-full h-full">{children}</div>
    </div>
  )
}
