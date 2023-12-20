'use client'

import { queryClient } from '@/providers/QueryProvider'
import { ReactNode, createContext, useContext, useState } from 'react'

interface ClientContextProviderProps {
  children: ReactNode
  clientIsAuthenticated: boolean
  arenaId: string
}

interface ClientContextType {
  date: Date | undefined
  setDate: (value: Date | undefined) => void
  clientIsAuthenticated: boolean
  arenaId: string
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

function ClientContextProvider({
  children,
  clientIsAuthenticated,
  arenaId,
}: ClientContextProviderProps) {
  const currentDate = new Date().setHours(0, 0, 0, 0)
  const [date, setDate] = useState<Date | undefined>(new Date(currentDate))

  const updateDate = (value: Date | undefined) => {
    setDate(value)
    queryClient.invalidateQueries({ queryKey: ['times'] })
  }

  return (
    <ClientContext.Provider
      value={{ date, setDate: updateDate, clientIsAuthenticated, arenaId }}
    >
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
