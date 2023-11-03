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
import convetHourInDate from '@/utils/convetHourInDate'
import { useEffect, useState } from 'react'

interface ScheduleCreateSheetProps {
  arenaId: string
}

export function ScheduleCreateSheet(props: ScheduleCreateSheetProps) {
  const { arenaId } = props
  const { data } = fieldQueryService.useFindAll(arenaId)

  const [open, setOpen] = useState<boolean>(false)
  const [hour, setHour] = useState<string>('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [listDate, setListDate] = useState<string[]>([])
  const [fieldId, setFieldId] = useState<string>('')

  console.log(listDate)

  useEffect(() => {
    if (date && fieldId !== '') {
      fieldService
        .findAvaliableTimes(fieldId, date.toString() as string)
        .then((list) => setListDate(list))
    }
  }, [date, fieldId])

  console.log(data)

  const createSchedule = () => {
    console.log('hora', convetHourInDate(hour, date))
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
      </div>
    </AppSheet>
  )
}
