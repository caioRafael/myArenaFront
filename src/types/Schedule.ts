import Entity from './Entity'
import Field from './Field'

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
}
