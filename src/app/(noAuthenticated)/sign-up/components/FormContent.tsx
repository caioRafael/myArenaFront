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
import { useForm, useController, Controller } from 'react-hook-form'
import { ArenaSignUpSchema, arenaSignUpSchema } from './ArenaSignUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export function FormContent() {
  const { toast } = useToast()
  const router = useRouter()
  const { register, handleSubmit, setValue, control, formState } =
    useForm<ArenaSignUpSchema>({
      resolver: zodResolver(arenaSignUpSchema),
    })
  const [stage, setStage] = useState<number>(1)

  const { field: cnpj } = useController({
    control,
    name: 'cnpj',
    defaultValue: '',
  })

  const { field: phone } = useController({
    control,
    name: 'phone',
    defaultValue: '',
  })

  const { field: admPhone } = useController({
    control,
    name: 'administrator.phone',
    defaultValue: '',
  })

  // // States for stage 1 fields
  // const [fantasyName, setFantasyName] = useState('')
  // const [corporateName, setCorporateName] = useState('')
  // // const [cnpj, setCnpj] = useState('')
  // // const [phone, setPhone] = useState('')
  // const [address, setAddress] = useState('')
  // const [pixKey, setPixKey] = useState('')
  // const [requirePrePayment, setRequirePrePayment] = useState<boolean>(false)

  // // States for stage 2 fields
  // const [name, setName] = useState('')
  // const [nickname, setNickname] = useState('')
  // const [email, setEmail] = useState('')
  // const [userPhone, setUserPhone] = useState<string>('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')

  const { mutateAsync, isPending } = arenaQueryService.useCreate()

  const handleCreateArena = async (data: ArenaSignUpSchema) => {
    console.log(data)
    if (data.administrator.password !== data.administrator.confirmPassword) {
      toast({
        title: 'Senha',
        description: 'As senhas não conferem.',
        variant: 'destructive',
      })
      return new Error('As senhas não conferem')
    }

    if (formState.errors) console.log(formState.errors.administrator?.name)

    // const data = {
    //   fantasyName,
    //   corporateName,
    //   // cnpj,
    //   phone,
    //   address,
    //   pixKey,
    //   requirePrePayment,
    //   administrator: {
    //     name,
    //     nickname,
    //     phone: userPhone,
    //     email,
    //     password,
    //   },
    // }

    // const response = await mutateAsync(data)

    // if (response) router.replace('/')
  }
  return (
    <form
      onSubmit={handleSubmit(handleCreateArena)}
      className="flex flex-col items-center justify-center w-full p-3 gap-5 border border-border rounded-md"
    >
      <h1>Cadastre sua arena</h1>

      <Progress value={stage === 1 ? 50 : 100} />
      <p className="self-start">
        Dados {stage === 1 ? 'da arena' : 'do administrador'}
      </p>

      {stage === 1 ? (
        <>
          <div className="flex flex-col w-full gap-2">
            <Label>Nome fantasia</Label>
            <Input
              placeholder="Nome fantasia"
              type="text"
              // value={fantasyName}
              // onChange={(e) => setFantasyName(e.target.value)}
              {...register('fantasyName')}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Rasão social</Label>
            <Input
              placeholder="Rasão social"
              type="text"
              {...register('corporateName')}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>CNPJ</Label>
            <MaskInput
              placeholder="CNPJ"
              type="text"
              typeMask={MaskEnum.CNPJ}
              value={cnpj.value}
              onMaskedChange={(value) => setValue('cnpj', value)}
              maxLength={18}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Telefone da empresa (WhatsApp)</Label>
            <MaskInput
              placeholder="Telefone (WhatsApp)"
              type="text"
              typeMask={MaskEnum.PHONE}
              value={phone.value}
              onMaskedChange={(value) => setValue('phone', value)}
              maxLength={15}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Endereço</Label>
            <Input
              placeholder="Endereço"
              type="text"
              {...register('address')}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Chave pix</Label>
            <Input
              placeholder="chave pix"
              type="text"
              {...register('pixKey')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="requirePrePayment"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={(value) => field.onChange(value)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Exigência de pagamento adiantado (Ao marcar essa opção, o
                    estabelecimento exige que o cliente pague metade do valor do
                    agendamento de forma antecipada)
                  </label>
                </>
              )}
            />
          </div>
          <Button
            onClick={() => {
              setValue('administrator.name', '')
              setValue('administrator.nickname', '')
              setValue('administrator.password', '')
              setValue('administrator.confirmPassword', '')
              setStage(2)
            }}
          >
            Próximo
          </Button>
        </>
      ) : (
        // Stage 2
        <>
          <div className="flex flex-col w-full gap-2">
            <Label>Nome</Label>
            <Input
              placeholder="Nome"
              type="text"
              {...register('administrator.name')}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Apelido</Label>
            <Input
              placeholder="Apelido"
              type="text"
              {...register('administrator.nickname')}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Telefone do administrador</Label>
            <MaskInput
              placeholder="Telefone"
              type="text"
              typeMask={MaskEnum.PHONE}
              value={admPhone.value}
              onMaskedChange={(value) => setValue('administrator.phone', value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Email</Label>
            <Input
              placeholder="Email"
              type="email"
              {...register('administrator.email')}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Senha</Label>
            <Input
              placeholder="Senha"
              type="password"
              {...register('administrator.password')}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Confirmar senha</Label>
            <Input
              placeholder="Confirmar senha"
              type="password"
              defaultValue={''}
              {...register('administrator.confirmPassword')}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setStage(1)} variant={'outline'}>
              Voltar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              // onClick={handleCreateArena}
            >
              {isPending ? <Spin /> : 'Cadastrar'}
            </Button>
          </div>
        </>
      )}
    </form>
  )
}
