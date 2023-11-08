'use client'

import { Card } from '@/components/ui/card'
import { arenaReportQueryService } from '@/services/arena'
import formatPrice from '@/utils/formatPrice'
import { useMemo } from 'react'

interface ReportContainerProps {
  arenaId: string
  token: string
}

export function ReportContainer(props: ReportContainerProps) {
  const { arenaId, token } = props
  const { data } = arenaReportQueryService.useFindAll(arenaId, token)

  const totalSchedules = useMemo(() => {
    let total = 0
    if (data) {
      data.forEach((field) => {
        total = total + (field?._count?.ScheduleTime as number)
      })
    }

    return total
  }, [data])

  const money = useMemo(() => {
    let value = 0
    if (data) {
      data.forEach((field) => {
        value = value + field.price * (field?._count?.ScheduleTime as number)
      })
    }

    return value
  }, [data])

  return (
    <div className="flex gap-3 flex-wrap">
      <Card className="p-4">
        <h1>Agendamentos do mês:</h1>
        <h1 className="text-2xl text-primary font-semibold">
          {totalSchedules}
        </h1>
      </Card>
      <Card className="p-4">
        <h1>Faturamento esperado:</h1>
        <h1 className="text-2xl text-primary font-semibold">
          {formatPrice(money)}
        </h1>
      </Card>
      <Card className="p-4">
        <h1>Faturamento arrecadado:</h1>
        <h1 className="text-2xl text-primary font-semibold">
          {formatPrice(money)}
        </h1>
      </Card>
    </div>
  )
}
