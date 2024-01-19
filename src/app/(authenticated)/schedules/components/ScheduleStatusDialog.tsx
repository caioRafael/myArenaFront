'use client'

import { AppModal } from '@/components/AppModal'
import { scheduleQueryService } from '@/services/schedule'
import Schedule, {
  ScheduleStatusEnum,
  ScheduleStatusRecord,
} from '@/types/Schedule'
import nextScheduleStatus from '@/utils/nextScheduleStatus'
import { ArrowRight, Gauge } from 'lucide-react'
import { useMemo, useState } from 'react'

interface ScheduleStatusDialogProps {
  scheduleId: string
  currentStatus: ScheduleStatusEnum
  hour: number
}

export function ScheduleStatusDialog(props: ScheduleStatusDialogProps) {
  const { scheduleId, currentStatus, hour } = props
  const [open, setOpen] = useState<boolean>(false)

  const { mutateAsync } = scheduleQueryService.usePatch(scheduleId)

  const handleUpdateStatus = async () => {
    const data = {
      status: nextScheduleStatus(currentStatus),
    } as Partial<Schedule>
    await mutateAsync(data)

    setOpen(false)
  }

  const disabled = useMemo(() => {
    const currentHour = new Date().getHours()
    if (currentStatus === ScheduleStatusEnum.APPROVED && currentHour < hour) {
      return true
    } else {
      return false
    }
  }, [hour, currentStatus])

  const ContentButton = () => (
    <>
      <Gauge className="hidden md:flex flex-1" />
      <h1 className="flex md:hidden">Status</h1>
    </>
  )
  return (
    <AppModal
      open={open}
      setOpen={setOpen}
      title="Alterar status"
      textButton={<ContentButton />}
      variantButton={'link'}
      action={handleUpdateStatus}
      textAction="Atualizar status"
      disabledButton={disabled}
    >
      <p>
        <b>Atenção!</b> esta ação irá mudar o status do horario selecionado
      </p>
      <div className="flex gap-2">
        {ScheduleStatusRecord[currentStatus]}
        <ArrowRight />
        {ScheduleStatusRecord[nextScheduleStatus(currentStatus)]}
      </div>
    </AppModal>
  )
}
