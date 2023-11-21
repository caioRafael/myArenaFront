'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { fieldQueryService } from '@/services/fields'
import { convertNumberInHour } from '@/utils/convetHourInDate'
import { TimeList } from './TimeList'

interface ClientFieldsListProps {
  arenaId: string
}

export function ClientFieldsList(props: ClientFieldsListProps) {
  const { arenaId } = props
  const { data: dataField } = fieldQueryService.useFindAll(arenaId)

  const formatPrice = (price: number) => {
    const opcoesDeFormatacao: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'BRL',
    }

    const formatador = new Intl.NumberFormat('pt-BR', opcoesDeFormatacao)
    return formatador.format(price as number)
  }

  return (
    <div className="flex flex-col gap-4 w-full px-10">
      <Accordion type="single">
        {dataField &&
          dataField?.map((field) => (
            <AccordionItem key={field.id} value={field.id as string}>
              <AccordionTrigger>{field.name}</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full items-center justify-between space-y-4">
                  <h1>{formatPrice(field.price)}</h1>
                  <h1>
                    {convertNumberInHour(field.openIn)} {' - '}
                    {convertNumberInHour(field.closeIn)}
                  </h1>
                </div>
                <h1>Horários:</h1>
                <TimeList fieldId={field.id as string} field={field} />
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  )
}
