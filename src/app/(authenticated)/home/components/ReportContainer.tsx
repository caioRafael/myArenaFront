'use client'

import { Card } from '@/components/ui/card'
import { arenaReportQueryService } from '@/services/arena'
import formatPrice from '@/utils/formatPrice'
// import { useMemo } from 'react'

interface ReportContainerProps {
  arenaId: string
  token: string
}

export function ReportContainer(props: ReportContainerProps) {
  const { arenaId, token } = props
  const { data } = arenaReportQueryService.useFindOne(arenaId, token)

  return (
    <div className="flex gap-3 flex-wrap">
      <Card className="p-4">
        <h1>Agendamentos do mês:</h1>
        <h1 className="text-2xl text-primary font-semibold">
          {data?.schedules || 0}
        </h1>
      </Card>
      <Card className="p-4">
        <h1>Faturamento esperado:</h1>
        <h1 className="text-2xl text-primary font-semibold">
          {formatPrice((data?.espec as number) || 0)}
        </h1>
      </Card>
      <Card className="p-4">
        <h1>Faturamento arrecadado:</h1>
        <h1 className="text-2xl text-primary font-semibold">
          {formatPrice((data?.revenue as number) || 0)}
        </h1>
      </Card>
    </div>
  )
}
