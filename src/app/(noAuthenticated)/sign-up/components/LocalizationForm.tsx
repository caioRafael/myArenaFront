'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useController, useForm } from 'react-hook-form'
import { LocalizationSchema, localizationSchema } from './ArenaSignUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MaskInput } from '@/components/MaskInput'
import { MaskEnum } from '@/utils/masks'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import brazilianStates from '@/utils/brazilianStates'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface LocalizationProps {
  localization: LocalizationSchema
  setLocalization: (value: LocalizationSchema) => void
  setStage: (stage: number) => void
}

export function LocalizationForm(props: LocalizationProps) {
  const { localization, setLocalization, setStage } = props
  const [citys, setCitys] = useState<{ nome: string }[]>([])
  const form = useForm<LocalizationSchema>({
    resolver: zodResolver(localizationSchema),
    defaultValues: localization,
  })

  const { field: cep } = useController({
    control: form.control,
    name: 'cep',
    defaultValue: '',
  })

  const { field: uf } = useController({
    control: form.control,
    name: 'uf',
    defaultValue: '',
  })

  useEffect(() => {
    form.setValue('city', '')
    if (uf.value) {
      axios
        .get(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf.value}`)
        .then((response) => {
          setCitys(response.data)
        })
    }
  }, [uf.value])

  const handleSetLocalization = (data: LocalizationSchema) => {
    setLocalization(data)
    setStage(3)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSetLocalization)}
        className="w-full flex flex-col gap-2 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <MaskInput
                  placeholder="Telefone "
                  {...field}
                  typeMask={MaskEnum.CEP}
                  type="text"
                  maxLength={9}
                  value={cep.value}
                  onMaskedChange={(value) => form.setValue('cep', value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uf"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>UF</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    {/* <Input placeholder="Informe o estado" {...field} /> */}
                    <Button
                      variant={'outline'}
                      className="items-start justify-start"
                    >
                      {field.value
                        ? brazilianStates.find(
                            (uf) => field.value === uf.abbreviation,
                          )?.abbreviation
                        : 'Selecione a UF'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full max-h-80 overflow-scroll">
                  <Command>
                    <CommandInput placeholder="Selecione a UF" />
                    <CommandGroup>
                      {brazilianStates.map((uf) => (
                        <CommandItem
                          key={uf.abbreviation}
                          value={`${uf.abbreviation} - ${uf.name}`}
                          onSelect={() => form.setValue('uf', uf.abbreviation)}
                        >
                          {uf.abbreviation} - {uf.name}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              uf.abbreviation === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Cidade</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    {/* <Input placeholder="Informe o estado" {...field} /> */}
                    <Button
                      variant={'outline'}
                      className="items-start justify-start"
                    >
                      {field.value
                        ? citys.find((city) => field.value === city.nome)?.nome
                        : 'Selecione a cidade'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full max-h-80 overflow-scroll">
                  <Command>
                    <CommandInput placeholder="Selecione a cidade" />
                    <CommandEmpty>
                      {uf.value === ''
                        ? 'Selecione uma uf'
                        : 'Nenhuma cidade encontrada'}
                    </CommandEmpty>
                    <CommandGroup>
                      {citys.map((city) => (
                        <CommandItem
                          key={city.nome}
                          value={`${city.nome}`}
                          onSelect={() => form.setValue('city', city.nome)}
                        >
                          {city.nome}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              city.nome === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locale"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Informe o bairro" {...field} />
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
                <Input placeholder="Informe o endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-1 flex-row">
          <Button variant={'link'} onClick={() => setStage(1)}>
            Voltar
          </Button>
          <Button type="submit">Proximo</Button>
        </div>
      </form>
    </Form>
  )
}
