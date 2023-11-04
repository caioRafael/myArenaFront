'use client'

import { ReactElement, ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

interface AppToolTipProps {
  children: ReactNode
  message: string | ReactElement
}

export function AppToolTip(props: AppToolTipProps) {
  const { children, message } = props
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
