'use client'

import { Card } from '@/components/ui/card'
import Schedule, { ScheduleStatusRecord } from '@/types/Schedule'
import { ScheduleDetailSheet } from './ScheduleDetailSheet'
import { convertNumberInHour } from '@/utils/convetHourInDate'
import { ScheduleStatusDialog } from './ScheduleStatusDialog'

interface ScheduleCardProps {
  schedule: Schedule
}

export function ScheduleCard(props: ScheduleCardProps) {
  const { schedule } = props

  return (
    <Card className="flex flex-col gap-4 items-start justify-between p-2 pl-4 border-t-4 border-l-0 border-t-primary border-l-primary md:border-t-0 md:border-l-4 md:flex-row md:items-center">
      <div className="flex flex-col gap-1">
        <b>Cliente:</b>
        {schedule.user?.nickname}
      </div>
      <div className="flex flex-col gap-1">
        <b>Código:</b>
        {schedule.code}
      </div>
      <div className="flex flex-col gap-1">
        <b>Quadra:</b>
        {schedule.field?.name}
      </div>
      <div className="flex flex-col gap-1">
        <b>Status:</b>
        {ScheduleStatusRecord[schedule.status]}
      </div>
      <div className="flex flex-col gap-1">
        <b>Esporte:</b>
        {schedule.sport}
      </div>
      <div className="flex flex-col gap-1">
        <b>Horário:</b>
        {convertNumberInHour(schedule.hour)}
        {' - '}
        {convertNumberInHour(schedule.endHour as number)}
      </div>
      <div className="flex flex-col md:flex-row gap-1 items-center justify-center self-center w-full md:w-16 md:pr-10">
        <ScheduleDetailSheet schedule={schedule} />
        <ScheduleStatusDialog
          scheduleId={schedule.id as string}
          currentStatus={schedule.status}
          hour={schedule.hour}
        />
      </div>
    </Card>
  )
}
