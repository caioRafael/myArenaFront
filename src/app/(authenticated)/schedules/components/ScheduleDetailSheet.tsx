'use client'

import { AppSheet } from '@/components/AppSheet'
import Schedule, { ScheduleStatusRecord } from '@/types/Schedule'
import { convertNumberInHour } from '@/utils/convetHourInDate'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'
import { useState } from 'react'

interface ScheduleDetailSheetProps {
  schedule: Schedule
}

const FormatDate = (dateTime: string) => {
  const date = dateTime.split('T')[0]
  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

export function ScheduleDetailSheet(props: ScheduleDetailSheetProps) {
  const { schedule } = props
  const [open, setOpen] = useState<boolean>(false)

  const ContentButton = () => (
    <>
      <Eye className="hidden md:flex flex-1" />
      <h1 className="flex md:hidden">Visualizar</h1>
    </>
  )
  return (
    <AppSheet
      title="Detalhar horário"
      open={open}
      setOpen={setOpen}
      textButton={<ContentButton />}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <b>Cliente:</b>
          {schedule.user?.nickname}
        </div>
        <div className="flex flex-col gap-1">
          <b>Telefone:</b>
          {schedule.user?.phone}
        </div>
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
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <b>Data:</b>
          {FormatDate(schedule.date + '')}
        </div>
        <div className="flex flex-col gap-1">
          <b>Horário:</b>
          {convertNumberInHour(schedule.hour)}
          {' - '}
          {convertNumberInHour(schedule.endHour as number)}
        </div>
      </div>
    </AppSheet>
  )
}
