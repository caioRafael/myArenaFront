'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { AdministrateSchema, CreateUserSquema } from './ArenaSignUpSchema'
import { Input } from '@/components/ui/input'
import { MaskInput } from '@/components/MaskInput'
import { MaskEnum } from '@/utils/masks'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Spin } from '@/components/Spin'

interface AdministratorFormProps {
  administratorData: AdministrateSchema
  setAdministratorData: (value: AdministrateSchema) => void
  setStage: (stage: number) => void
  isPending: boolean
  handleCreateArena: () => Promise<void>
}

export function AdministratorForm(props: AdministratorFormProps) {
  const {
    administratorData,
    setAdministratorData,
    isPending,
    handleCreateArena,
    setStage,
  } = props
  const { toast } = useToast()
  const form = useForm<AdministrateSchema>({
    resolver: zodResolver(CreateUserSquema),
    defaultValues: administratorData,
  })

  const { field: admPhone } = useController({
    control: form.control,
    name: 'phone',
    defaultValue: '',
  })

  const handleCreateUser = async (data: AdministrateSchema) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Senha',
        description: 'As senhas não conferem.',
        variant: 'destructive',
      })
      return new Error('As senhas não conferem')
    }
    setAdministratorData(data)
    // setStage(1)
    await handleCreateArena()
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateUser)}
        className="w-full flex flex-col gap-2 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome do administrador</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome do adminstrador da arena"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Apelido</FormLabel>
              <FormControl>
                <Input placeholder="Digite o apelido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Telefone do administrador</FormLabel>
              <FormControl>
                <MaskInput
                  placeholder="Digite o telefone"
                  {...field}
                  typeMask={MaskEnum.PHONE}
                  type="text"
                  maxLength={15}
                  value={admPhone.value}
                  onMaskedChange={(value) => form.setValue('phone', value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite o email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a senha"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o senha"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-1 flex-row">
          <Button variant={'link'} onClick={() => setStage(2)}>
            Voltar
          </Button>
          <Button type="submit">{isPending ? <Spin /> : 'Cadastrar'}</Button>
        </div>
      </form>
    </Form>
  )
}
