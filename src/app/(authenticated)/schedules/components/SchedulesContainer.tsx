'use client'

import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datePicker'
import { scheduleQueryService } from '@/services/schedule'
import { useState } from 'react'
import { ScheduleCard } from './ScheduleCard'
import { Input } from '@/components/ui/input'
// import { ScheduleCreateSheet } from './ScheduleCreateSheet'

interface CalendarProps {
  token: string
  arenaId: string
}

export function SchedulesContainer(props: CalendarProps) {
  const { token, arenaId } = props
  const currentDate = new Date()
  const sendDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() < 9 ? '0' : ''
  }${currentDate.getMonth() + 1}-${currentDate.getDate()}`
  const [date, setDate] = useState<string | undefined>(sendDate)
  const [code, setCode] = useState<string | undefined>(undefined)
  const { data, refetch } = scheduleQueryService.useFindAll(
    arenaId,
    date,
    token,
    code,
  )

  const setNewDate = (date: Date | undefined) => {
    if (date) {
      const newSendDate = `${date.getFullYear()}-${
        date.getMonth() < 9 ? '0' : ''
      }${date.getMonth() + 1}-${date.getDate()}`

      setDate(newSendDate)
    }
  }
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col md:flex-row gap-3">
          <DatePicker date={new Date(date as string)} setDate={setNewDate} />
          <Input
            placeholder="Código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={() => refetch()}>Pesquisar</Button>
        </div>
      </div>
      {data?.map((schedule) => (
        <ScheduleCard schedule={schedule} key={schedule.id} token={token} />
      ))}
      {data?.length === 0 && (
        <EmptyState message="Nenhum agendamento nessa data" />
      )}
    </div>
  )
}
