'use client'

import { AppSheet } from '@/components/AppSheet'
import { Badge } from '@/components/ui/badge'
import Field from '@/types/Field'
import { convertNumberInHour } from '@/utils/convetHourInDate'
import { useState } from 'react'

interface FieldDetailsSheetProps {
  field: Field
}

export function FieldDetailsSheet(props: FieldDetailsSheetProps) {
  const { field } = props
  const [open, setOpen] = useState<boolean>(false)

  const formatPrice = (price: number) => {
    const opcoesDeFormatacao: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'BRL',
    }

    const formatador = new Intl.NumberFormat('pt-BR', opcoesDeFormatacao)
    return formatador.format(price as number)
  }
  return (
    <AppSheet
      title="Detalhar quadra"
      open={open}
      setOpen={setOpen}
      textButton={'Detalhar'}
    >
      <div>
        <h1>Preço por hora:</h1>
        {formatPrice(field.price)}
      </div>
      <div>
        <h1>Horários:</h1>
        {convertNumberInHour(field.openIn)} -{' '}
        {convertNumberInHour(field.closeIn)}
      </div>
      <div>
        <h1>Esportes:</h1>
        <div className="flex flex-row flex-wrap gap-1">
          {field.sports.split(', ').map((sport) => (
            <Badge key={sport} className="flex gap-2 h-6">
              {sport}
            </Badge>
          ))}
        </div>
      </div>
    </AppSheet>
  )
}
