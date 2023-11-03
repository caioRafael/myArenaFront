'use client'

import { AppSheet } from '@/components/AppSheet'
import Schedule from '@/types/Schedule'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'
import { useState } from 'react'

interface ScheduleDetailSheetProps {
  schedule: Schedule
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
          {schedule.clientName}
        </div>
        <div className="flex flex-col gap-1">
          <b>Telefone:</b>
          {schedule.clientPhone}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <b>Quadra:</b>
        {schedule.field?.name}
      </div>
      <div className="flex flex-col gap-1">
        <b>Esporte:</b>
        {schedule.sport}
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <b>Data:</b>
          {format(new Date(schedule.date), 'dd/MM/yyyy')}
        </div>
        <div className="flex flex-col gap-1">
          <b>Horário:</b>
          {format(new Date(schedule.hour), 'hh:mm')}
          {' - '}
          {format(new Date(schedule?.endHour as Date), 'hh:mm')}
        </div>
      </div>
    </AppSheet>
  )
}
