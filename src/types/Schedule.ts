import Entity from './Entity'
import Field from './Field'
import User from './User'

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
  userId: string
  user?: User
  hour: number
  endHour?: number
  amountHours: number
  code: string
  sport: string
  fieldId: string
  field?: Field
  price: number
  status: ScheduleStatusEnum
}
