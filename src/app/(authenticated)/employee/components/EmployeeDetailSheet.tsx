'use client'

import { AppSheet } from '@/components/AppSheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import User, { UserProfileEnum, UserProfileRecord } from '@/types/User'
import { convertHourInNumber } from '@/utils/convetHourInDate'
import { format } from 'date-fns'
import { useState } from 'react'

interface EmployeeDetailSheetProps {
  user: User
}

export function EmployeeDetailSheet(props: EmployeeDetailSheetProps) {
  const { user } = props
  const [open, setOpen] = useState<boolean>(false)

  return (
    <AppSheet
      title="Detalhar funcionário"
      open={open}
      setOpen={setOpen}
      textButton={'Detalhar'}
    >
      <div className="flex flex-row gap-2 items-center p-2">
        <Avatar>
          <AvatarFallback>
            {user.name.split(' ')[0].charAt(0).toUpperCase()}
            {user.name.split(' ')[1]?.charAt(0).toUpperCase()}
          </AvatarFallback>
          <AvatarImage src={user.avatar} />
        </Avatar>
        <div>
          <h1>{user.nickname}</h1>
          <h1>{user.email}</h1>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-4">
        <div className="flex flex-col">
          <Label className="font-semibold">Nome:</Label> {user.name}
        </div>

        <div className="flex flex-col">
          <Label className="font-semibold">Perfil:</Label>{' '}
          {UserProfileRecord[user.profile as UserProfileEnum]}
        </div>

        <div className="flex flex-col">
          <Label className="font-semibold">Telefone:</Label> {user.phone}
        </div>

        {user.createdAt && (
          <div className="flex flex-col">
            <Label className="font-semibold">Data de criação:</Label>{' '}
            {format(new Date(user.createdAt), 'dd/MM/yyyy')}
          </div>
        )}
      </div>
    </AppSheet>
  )
}
