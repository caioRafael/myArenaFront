'use client'
import { Button } from '@/components/ui/button'
import { useClientContext } from '../context/ClientContext'
import { useQuery } from '@tanstack/react-query'
import { scheduleService } from '@/services/schedule'
import { Spin } from '@/components/Spin'
import { convertNumberInHour } from '@/utils/convetHourInDate'
import { useEffect } from 'react'
import { ClientScheduleSheet } from './ClientScheduleSheet'
import Field from '@/types/Field'

interface TimeListProps {
  fieldId: string
  field: Field
}

export function TimeList(props: TimeListProps) {
  const { fieldId, field } = props
  const { date } = useClientContext()
  const { data, isLoading, refetch } = useFindTime(fieldId, date as Date)

  const handleRefetch = () => {
    refetch()
  }

  useEffect(() => {
    refetch()
  }, [date])

  if (isLoading) <Spin />
  return (
    <div className="flex flex-col my-4 gap-3">
      {data &&
        data.map((time: number) => (
          <div
            className="flex items-center justify-between border-y-2 py-1 px-3"
            key={time}
          >
            <h1>{convertNumberInHour(time)}</h1>
            <ClientScheduleSheet
              time={time}
              field={field}
              refetch={handleRefetch}
            />
          </div>
        ))}
    </div>
  )
}

const useFindTime = (fieldId: string, date: Date) => {
  return useQuery({
    queryKey: ['times'],
    queryFn: () => scheduleService.findTimes(fieldId, date),
  })
}
