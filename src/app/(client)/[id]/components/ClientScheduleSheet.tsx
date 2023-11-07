'use client'

import { AppSheet } from '@/components/AppSheet'
import Field from '@/types/Field'
import { convertNumberInHour } from '@/utils/convetHourInDate'
import { useMemo, useState } from 'react'
import { useClientContext } from '../context/ClientContext'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Schedule from '@/types/Schedule'
import { scheduleQueryService } from '@/services/schedule'

interface ClientScheduleSheetProps {
  field: Field
  time: number
  refetch: () => void
}

export function ClientScheduleSheet(props: ClientScheduleSheetProps) {
  const { time, field, refetch } = props
  const { date } = useClientContext()
  const [open, setOpen] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(1)
  const [sport, setSport] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')
  const [clientPhone, setClientPhone] = useState<string>('')

  const { mutateAsync } = scheduleQueryService.useCreate()

  const sportList = useMemo(() => {
    return field.sports.split(',')
  }, [field])

  const createSchedule = async () => {
    const data = {
      amountHours: amount,
      clientName,
      clientPhone,
      date,
      fieldId: field.id as string,
      hour: time,
      sport,
    } as Schedule

    const response = await mutateAsync(data)

    if (response) {
      setOpen(false)
      refetch()
    }
  }
  return (
    <AppSheet
      title="Agendar horário"
      open={open}
      setOpen={setOpen}
      textButton={'Agendar'}
      textAction="Agendar horário"
      action={createSchedule}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1>{field.name}</h1>
          <h1>
            {format(date as Date, 'dd/MM')} - {convertNumberInHour(time)}
          </h1>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Cliente:</Label>
          <Input
            placeholder="Nome"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Telefone:</Label>
          <Input
            placeholder="Telefone"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>Quantidade de horas:</Label>
          <Input
            placeholder="Quantidade de horas"
            type="number"
            value={amount.toString()}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        {sportList && (
          <div className="flex flex-col w-full gap-2">
            <Label>Esporte:</Label>
            <Select onValueChange={(value) => setSport(value)} value={sport}>
              <SelectTrigger>
                <SelectValue placeholder={'Selecione uma um esporte'} />
              </SelectTrigger>
              <SelectContent>
                {sportList.map((sport) => (
                  <SelectItem key={sport} value={sport as string}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </AppSheet>
  )
}
