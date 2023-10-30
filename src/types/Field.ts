import Arena from './Arena'
import Entity from './Entity'

export default interface Field extends Entity {
  name: string
  price: number
  openIn: Date
  closeIn: Date
  sports: string
  arenaId: string
  arena?: Arena
}
