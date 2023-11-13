'use client'

import { AppSheet } from '@/components/AppSheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { userQueryService } from '@/services/user'
import User, { UserProfileEnum } from '@/types/User'
import { useState } from 'react'

interface EmployeeCreateSheetProps {
  arenaId: string
}

export function EmployeeCreateSheet(props: EmployeeCreateSheetProps) {
  const { arenaId } = props
  const [open, setOpen] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { mutateAsync } = userQueryService.useCreate()

  const registerNewUser = async () => {
    if (password !== confirmPassword) {
      toast({
        title: 'Senha',
        description: 'As senhas não conferem.',
        variant: 'destructive',
      })
      return new Error('As senhas não conferem')
    }
    const data = {
      name,
      nickname,
      email,
      password,
      profile: UserProfileEnum.EMPLOYEE,
      arenaId,
    } as User

    const response = await mutateAsync(data)

    if (response) setOpen(false)
  }

  return (
    <AppSheet
      title="Cadastrar novo funcionário"
      textButton={'Novo funcionário'}
      open={open}
      setOpen={setOpen}
      action={registerNewUser}
      textAction="Cadastrar"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-2">
          <Label>Nome</Label>
          <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Apelido</Label>
          <Input
            placeholder="Apelido"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Email</Label>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Senha inicial</Label>
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Confirmar senha</Label>
          <Input
            placeholder="Confirmar senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
    </AppSheet>
  )
}
