'use client'

import { queryClient } from '@/providers/QueryProvider'
import { scheduleService } from '@/services/schedule'
import { useQuery } from '@tanstack/react-query'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface ClientContextProviderProps {
  children: ReactNode
}

interface ClientContextType {
  date: Date | undefined
  setDate: (value: Date | undefined) => void
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

function ClientContextProvider({ children }: ClientContextProviderProps) {
  const currentDate = new Date().setHours(0, 0, 0, 0)
  const [date, setDate] = useState<Date | undefined>(new Date(currentDate))

  const updateDate = (value: Date | undefined) => {
    setDate(value)
    queryClient.invalidateQueries({ queryKey: ['times'] })
  }

  return (
    <ClientContext.Provider value={{ date, setDate: updateDate }}>
      {children}
    </ClientContext.Provider>
  )
}

const useClientContext = () => {
  const context = useContext(ClientContext)
  if (context === undefined) {
    throw new Error(
      'useClientContext deve ser usado dentro de um ClientContextProvider',
    )
  }
  return context
}

export { ClientContext, ClientContextProvider, useClientContext }
