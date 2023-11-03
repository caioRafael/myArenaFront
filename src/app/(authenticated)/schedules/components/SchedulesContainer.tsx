'use client'

import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datePicker'
import { scheduleQueryService } from '@/services/schedule'
import { useState } from 'react'
import { ScheduleCard } from './ScheduleCard'
import { ScheduleCreateSheet } from './ScheduleCreateSheet'

interface CalendarProps {
  token: string
  arenaId: string
}

export function SchedulesContainer(props: CalendarProps) {
  const { token, arenaId } = props
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { data, refetch } = scheduleQueryService.useFindAll(date, token)
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col md:flex-row gap-3">
          <DatePicker date={date as Date} setDate={setDate} />
          <Button onClick={() => refetch()}>Pesquisar</Button>
        </div>
        <ScheduleCreateSheet arenaId={arenaId} />
      </div>
      {data?.map((schedule) => (
        <ScheduleCard schedule={schedule} key={schedule.key} />
      ))}
      {data?.length === 0 && (
        <EmptyState message="Nenhum agendamento nessa data" />
      )}
    </div>
  )
}
