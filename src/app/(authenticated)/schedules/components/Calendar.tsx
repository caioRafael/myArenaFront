'use client'

import { DatePicker } from '@/components/ui/datePicker'
import { scheduleQueryService } from '@/services/schedule'
import { useState } from 'react'

interface CalendarProps {
  token: string
}

export function Calendar(props: CalendarProps) {
  const { token } = props
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { data } = scheduleQueryService.useFindAll(date?.toISOString(), token)
  return (
    <div>
      <h1>Demo App</h1>
      <DatePicker date={date as Date} setDate={setDate} />
      {JSON.stringify(data)}
    </div>
  )
}
