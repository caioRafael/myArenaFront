'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useController, useForm } from 'react-hook-form'
import { ArenaSignUpSchema, arenaSignUpSchema } from './ArenaSignUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { MaskInput } from '@/components/MaskInput'
import { MaskEnum } from '@/utils/masks'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface ArenaFormProps {
  arenaData: ArenaSignUpSchema
  setArenaData: (value: ArenaSignUpSchema) => void
  setStage: (stage: number) => void
}

export function ArenaForm(props: ArenaFormProps) {
  const { arenaData, setArenaData, setStage } = props
  const form = useForm<ArenaSignUpSchema>({
    resolver: zodResolver(arenaSignUpSchema),
    defaultValues: arenaData,
  })

  const { field: cnpj } = useController({
    control: form.control,
    name: 'cnpj',
    defaultValue: '',
  })

  const { field: phone } = useController({
    control: form.control,
    name: 'phone',
    defaultValue: '',
  })

  const handleCreateArena = async (data: ArenaSignUpSchema) => {
    console.log(data)
    setArenaData(data)
    setStage(2)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateArena)}
        className="w-full flex flex-col gap-2 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="fantasyName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome fantasia</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome fantasia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="corporateName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Razão social</FormLabel>
              <FormControl>
                <Input placeholder="Digite a razão social" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <MaskInput
                  placeholder="CNPJ"
                  {...field}
                  typeMask={MaskEnum.CNPJ}
                  type="text"
                  maxLength={18}
                  value={cnpj.value}
                  onMaskedChange={(value) => form.setValue('cnpj', value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Telefone da empresa (WhatsApp)</FormLabel>
              <FormControl>
                <MaskInput
                  placeholder="Telefone (WhatsApp)"
                  {...field}
                  typeMask={MaskEnum.PHONE}
                  type="text"
                  maxLength={15}
                  value={phone.value}
                  onMaskedChange={(value) => form.setValue('phone', value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Digite o endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pixKey"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Chave pix</FormLabel>
              <FormControl>
                <Input placeholder="Digite a chave pix" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requirePrePayment"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-2">
              <FormControl className="mt-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="flex flex-col gap-1">
                <FormLabel>Pagamento antecipado obrigatório</FormLabel>
                <FormDescription>
                  Exigência de pagamento adiantado (Ao marcar essa opção, o
                  estabelecimento exige que o cliente pague metade do valor do
                  agendamento de forma antecipada)
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Próximo</Button>
      </form>
    </Form>
  )
}
