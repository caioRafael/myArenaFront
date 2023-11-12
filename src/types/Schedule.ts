import Entity from './Entity'
import Field from './Field'

export enum ScheduleStatusEnum {
  DOWN_PAYMENT = 'DOWN_PAYMENT',
  APPROVED = 'APPROVED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
  FINAL_PAYMENT = 'FINAL_PAYMENT',
  CLOSED = 'CLOSED',
}

export const ScheduleStatusRecord: Record<ScheduleStatusEnum, string> = {
  DOWN_PAYMENT: 'Pagamento inicial',
  APPROVED: 'Aprovado',
  STARTED: 'Iniciado',
  FINISHED: 'Finalizado',
  FINAL_PAYMENT: 'Pagamento final',
  CLOSED: 'Encerrado',
}

export default interface Schedule extends Entity {
  date: Date
  hour: number
  endHour?: number
  amountHours: number
  clientName: string
  clientPhone: string
  sport: string
  fieldId: string
  field?: Field
  price: number
  status: ScheduleStatusEnum
}
