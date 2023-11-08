import Arena from './Arena'
import Entity from './Entity'
import Report from './Report'

export default interface Field extends Entity, Report {
  name: string
  price: number
  openIn: number
  closeIn: number
  sports: string
  arenaId: string
  arena?: Arena
}
