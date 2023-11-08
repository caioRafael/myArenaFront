import { ReactElement, ReactNode } from 'react'
import { Title } from './Title'
import { cn } from '@/lib/utils'

interface AppPageProps {
  children: ReactNode
  title: string
  topRightContainer?: ReactElement
  className?: string
}

export function AppPage(props: AppPageProps) {
  const { children, title, topRightContainer, className } = props
  return (
    <div className="w-full h-page flex flex-col gap-2 p-10 overflow-scroll">
      <div className="flex items-center justify-between">
        <Title title={title} />
        {topRightContainer}
      </div>
      <div className={cn('mt-10 w-full h-full', className)}>{children}</div>
    </div>
  )
}
