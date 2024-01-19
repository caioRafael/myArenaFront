'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { userQueryService } from '@/services/user'
import User, { UserProfileEnum } from '@/types/User'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spin } from '@/components/Spin'
import { signIn } from 'next-auth/react'

interface ClientFormProps {
  redirectTo?: string
}

export default function ClientForm(props: ClientFormProps) {
  const { redirectTo } = props
  const { mutateAsync: save, isPending } = userQueryService.useCreate()
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const createNewClient = async () => {
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
      phone,
      email,
      password,
      profile: UserProfileEnum.CLIENT,
    } as User

    const result = await save(data)

    const signInResult = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result && signInResult) {
      router.replace(`/client/${redirectTo || ''}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-3 gap-5 border border-border rounded-md">
      <h1>Realize seu cadastro</h1>

      <div className="flex flex-col w-full gap-2">
        <Label>Nome </Label>
        <Input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Apelido </Label>
        <Input
          placeholder="Apelido"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Telefone </Label>
        <Input
          placeholder="Telefone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Email </Label>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Senha </Label>
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Confirmar senha </Label>
        <Input
          placeholder="Confirmar senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button onClick={createNewClient}>
        {isPending ? <Spin /> : 'Cadastrar'}
      </Button>
    </div>
  )
}
