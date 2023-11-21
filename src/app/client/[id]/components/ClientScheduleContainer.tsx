'use client'

import { DatePicker } from '@/components/ui/datePicker'
import { useClientContext } from '../context/ClientContext'

export function ClientScheduleContainer() {
  const { date, setDate } = useClientContext()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-3">
        <DatePicker date={date as Date} setDate={setDate} />
      </div>
    </div>
  )
}
