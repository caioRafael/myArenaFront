'use client'

import { AppSheet } from '@/components/AppSheet'
import { DatePicker } from '@/components/ui/datePicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fieldQueryService, fieldService } from '@/services/fields'
import { scheduleQueryService } from '@/services/schedule'
import Schedule from '@/types/Schedule'
import convetHourInDate from '@/utils/convetHourInDate'
import { useEffect, useMemo, useState } from 'react'

interface ScheduleCreateSheetProps {
  arenaId: string
}

export function ScheduleCreateSheet(props: ScheduleCreateSheetProps) {
  const { arenaId } = props
  const { data } = fieldQueryService.useFindAll(arenaId)
  const { mutateAsync } = scheduleQueryService.useCreate()

  const [open, setOpen] = useState<boolean>(false)
  const [clientName, setClientName] = useState<string>('')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [hour, setHour] = useState<string>('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [amount, setAmount] = useState<number>(0)
  const [sport, setSport] = useState<string>('')
  const [listDate, setListDate] = useState<string[]>([])
  const [fieldId, setFieldId] = useState<string>('')

  const sportList = useMemo(() => {
    const selectedField = data?.find((field) => field.id === fieldId)

    return selectedField?.sports.split(',')
  }, [fieldId, data])

  useEffect(() => {
    if (date && fieldId !== '') {
      fieldService
        .findAvaliableTimes(fieldId, date.toString() as string)
        .then((list) => setListDate(list))
    }
  }, [date, fieldId])

  const createSchedule = async () => {
    const data = {
      amountHours: amount,
      clientName,
      clientPhone,
      date,
      fieldId,
      hour: convetHourInDate(hour, date),
      sport,
    } as Schedule

    console.log(data)
    await mutateAsync(data)
    setOpen(false)
  }
  return (
    <AppSheet
      title="Agendar horário"
      open={open}
      setOpen={setOpen}
      textButton={'Agendar novo horário'}
      textAction="Agendar horário"
      action={createSchedule}
    >
      <div className="flex flex-col gap-4">
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
          <Label>Quadra:</Label>
          <Select onValueChange={(value) => setFieldId(value)} value={fieldId}>
            <SelectTrigger>
              <SelectValue placeholder={'Selecione uma quadra'} />
            </SelectTrigger>
            <SelectContent>
              {data?.map((field) => (
                <SelectItem key={field.id} value={field.id as string}>
                  {field.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Data:</Label>
          <DatePicker date={date as Date} setDate={setDate} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Hora:</Label>
          <Input
            placeholder="Abre as"
            type="time"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
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
