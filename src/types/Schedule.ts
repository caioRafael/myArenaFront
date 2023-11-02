import Entity from './Entity'
import Field from './Field'

export default interface Schedule extends Entity {
  date: Date
  hour: Date
  endHour?: Date
  amountHours: number
  clientName: string
  clientPhone: string
  sport: string
  fieldId: string
  field?: Field
}
