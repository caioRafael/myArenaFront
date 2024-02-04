'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { arenaQueryService } from '@/services/arena'
import { Spin } from '@/components/Spin'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { MaskInput } from '@/components/MaskInput'
import { MaskEnum } from '@/utils/masks'

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
  const [pixKey, setPixKey] = useState('')
  const [requirePrePayment, setRequirePrePayment] = useState<boolean>(false)

  // States for stage 2 fields
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [userPhone, setUserPhone] = useState<string>('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [teste, setTeste] = useState('')

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
      pixKey,
      requirePrePayment,
      administrator: {
        name,
        nickname,
        phone: userPhone,
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
          <MaskInput
            placeholder="teste"
            value={teste}
            typeMask={MaskEnum.CEP}
            onMaskedChange={setTeste}
            maxLength={9}
          />
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
            <MaskInput
              placeholder="CNPJ"
              type="text"
              typeMask={MaskEnum.CNPJ}
              value={cnpj}
              onMaskedChange={setCnpj}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Telefone da empresa (WhatsApp)</Label>
            <MaskInput
              placeholder="Telefone (WhatsApp)"
              type="text"
              typeMask={MaskEnum.PHONE}
              value={phone}
              onMaskedChange={setPhone}
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
          <div className="flex flex-col w-full gap-2">
            <Label>Chave pix</Label>
            <Input
              placeholder="chave pix"
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={requirePrePayment}
              onCheckedChange={(value) =>
                setRequirePrePayment(value as boolean)
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Exigência de pagamento adiantado (Ao marcar essa opção, o
              estabelecimento exige que o cliente pague metade do valor do
              agendamento de forma antecipada)
            </label>
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
            <Label>Telefone do administrador</Label>
            <MaskInput
              placeholder="Telefone"
              type="text"
              typeMask={MaskEnum.PHONE}
              value={userPhone}
              onMaskedChange={setUserPhone}
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
