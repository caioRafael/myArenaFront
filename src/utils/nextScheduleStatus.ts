import { ScheduleStatusEnum } from '@/types/Schedule'

export default function nextScheduleStatus(value: ScheduleStatusEnum) {
  switch (value) {
    case ScheduleStatusEnum.DOWN_PAYMENT:
      return ScheduleStatusEnum.APPROVED
    case ScheduleStatusEnum.APPROVED:
      return ScheduleStatusEnum.STARTED
    case ScheduleStatusEnum.STARTED:
      return ScheduleStatusEnum.FINISHED
    case ScheduleStatusEnum.FINISHED:
      return ScheduleStatusEnum.FINAL_PAYMENT
    case ScheduleStatusEnum.FINAL_PAYMENT:
      return ScheduleStatusEnum.CLOSED
    default:
      return value
  }
}
