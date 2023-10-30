'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export interface ITitleProps {
  title: string
  className?: string
  hasNavigation?: boolean
}

export function Title({ title, className, hasNavigation = true }: ITitleProps) {
  const router = useRouter()
  return (
    <div className="flex flex-row gap-3 items-center">
      {hasNavigation && (
        <button onClick={() => router.back()}>
          <ChevronLeft strokeWidth={1} className="h-8 w-8" />
        </button>
      )}
      <h1
        className={`font-semibold text-3xl after:block w-fit after:h-[3px] after:w-[60%] after:bg-primary after:rounded-sm mb-2 ${className}`}
      >
        {title}
      </h1>
    </div>
  )
}
