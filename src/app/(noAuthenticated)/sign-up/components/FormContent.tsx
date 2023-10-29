'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { arenaQueryService } from '@/services/arena/inddex'
import { Spin } from '@/components/Spin'
import { useRouter } from 'next/navigation'

export function FormContent() {
  const { toast } = useToast()
  const router = useRouter()
  const [stage, setStage] = useState<number>(1)

  // States for stage 1 fields
  const [fantasyName, setFantasyName] = useState('')
  const [corporateName, setCorporateName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  // States for stage 2 fields
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { mutateAsync, isPending } = arenaQueryService.useCreate()

  const handleCreateArena = async () => {
    if (password !== confirmPassword) {
      toast({
        title: 'Senha',
        description: 'As senhas não conferem.',
        variant: 'destructive',
      })
      return new Error('As senhas não conferem')
    }

    const data = {
      fantasyName,
      corporateName,
      cnpj,
      phone,
      address,
      administrator: {
        name,
        nickname,
        email,
        password,
      },
    }

    const response = await mutateAsync(data)

    if (response) router.replace('/')
  }
  return (
    <div className="flex flex-col items-center justify-center w-full p-3 gap-5 border border-border rounded-md">
      <h1>Cadastre sua arena</h1>

      <Progress value={stage === 1 ? 50 : 100} />
      <p className="self-start">
        dados {stage === 1 ? 'da arena' : 'do administrador'}
      </p>

      {stage === 1 ? (
        <>
          <div className="flex flex-col w-full gap-2">
            <Label>Nome fantasia</Label>
            <Input
              placeholder="Nome fantasia"
              type="text"
              value={fantasyName}
              onChange={(e) => setFantasyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Rasão social</Label>
            <Input
              placeholder="Rasão social"
              type="text"
              value={corporateName}
              onChange={(e) => setCorporateName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>CNPJ</Label>
            <Input
              placeholder="CNPJ"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Telefone</Label>
            <Input
              placeholder="Telefone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Endereço</Label>
            <Input
              placeholder="Endereço"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button onClick={() => setStage(2)}>Próximo</Button>
        </>
      ) : (
        // Stage 2
        <>
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
            <Label>Senha</Label>
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
          <div className="flex gap-3">
            <Button onClick={() => setStage(1)} variant={'outline'}>
              Voltar
            </Button>
            <Button disabled={isPending} onClick={handleCreateArena}>
              {isPending ? <Spin /> : 'Cadastrar'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
