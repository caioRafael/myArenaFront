'use client'
import { scheduleQueryService } from '@/services/schedule'
import { ScheduleCard } from '../../schedules/components/ScheduleCard'
import { EmptyState } from '@/components/EmptyState'
import useWebSocket from '@/lib/socket'

interface SchedulesItemsContainerProps {
  arenaId: string
  token: string
}

export function SchedulesItemsContainer(props: SchedulesItemsContainerProps) {
  const { arenaId, token } = props
  const currentDate = new Date().setHours(0, 0, 0, 0)
  console.log('data', new Date(currentDate))
  const { data } = scheduleQueryService.useFindAll(
    arenaId,
    new Date(currentDate),
    token,
    '',
  )
  useWebSocket('findSchedules', scheduleQueryService)

  if (data?.length === 0)
    return <EmptyState message="Nenhum agendamento nessa data" />
  return (
    <div className="flex flex-col w-full gap-6">
      {data &&
        data.map((schedule, index) => {
          if (index < 3) {
            return (
              <ScheduleCard
                schedule={schedule}
                key={schedule.id}
                token={token}
              />
            )
          }

          return <></>
        })}
    </div>
  )
}
