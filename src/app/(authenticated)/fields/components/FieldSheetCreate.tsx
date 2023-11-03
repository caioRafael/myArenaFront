'use client'

import { AppSheet } from '@/components/AppSheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { fieldQueryService } from '@/services/fields'
import Field from '@/types/Field'
import convetHourInDate from '@/utils/convetHourInDate'
import { Plus, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

interface FieldSheetCreateProps {
  arenaId: string
  token: string
}

export function FieldSheetCreate(props: FieldSheetCreateProps) {
  const { arenaId, token } = props
  const [open, setOpen] = useState<boolean>(false)
  const [sports, setSports] = useState<string[]>([])
  const [currentSport, setCurrentSport] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [openIn, setOpenIn] = useState<string>('')
  const [closeIn, setCloseIn] = useState<string>('')
  const [price, setPrice] = useState<number | undefined>(0)

  const { mutateAsync } = fieldQueryService.useCreate(token)

  const addSport = () => {
    setSports([...sports, currentSport])
    setCurrentSport('')
  }

  const removeSport = (value: string) => {
    setSports(sports.filter((sport) => sport !== value))
  }

  const handleCreateField = async () => {
    const data = {
      name,
      price: price as number,
      openIn: convetHourInDate(openIn),
      closeIn: convetHourInDate(closeIn),
      arenaId,
      sports: sports.join(', '),
    } as Field

    const response = await mutateAsync(data)

    if (response) setOpen(false)
  }

  const updatePrice = useCallback((value: string) => {
    const newValue = value.replace(/[^0-9.]/g, '')

    setPrice(Number(newValue) / 100)
  }, [])

  const valueForHour = useMemo(() => {
    const opcoesDeFormatacao: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'BRL',
    }

    const formatador = new Intl.NumberFormat('pt-BR', opcoesDeFormatacao)
    return formatador.format(price as number)
  }, [price])

  return (
    <AppSheet
      setOpen={setOpen}
      open={open}
      textButton="Nova quadra"
      title="Cadastrar nova quadra"
      action={handleCreateField}
      textAction="Cadastrar quadra"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-2">
          <Label>Nome:</Label>
          <Input
            placeholder="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Preço:</Label>
          <Input
            placeholder="Preço por hora"
            type="text"
            value={valueForHour}
            onChange={(e) => updatePrice(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Abre as:</Label>
          <Input
            placeholder="Abre as"
            type="time"
            value={openIn}
            onChange={(e) => setOpenIn(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Fecha as:</Label>
          <Input
            placeholder="Fecha as"
            type="time"
            value={closeIn}
            onChange={(e) => setCloseIn(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Esportes:</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Esprtes"
              type="text"
              value={currentSport}
              onChange={(e) => setCurrentSport(e.target.value)}
            />
            <Button onClick={addSport}>
              <Plus />
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {sports.map((sport) => (
              <Badge key={sport} className="flex gap-2 h-6">
                {sport} <Separator orientation="vertical" />{' '}
                <X
                  onClick={() => removeSport(sport)}
                  className="w-4 h-4 cursor-pointer"
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </AppSheet>
  )
}
