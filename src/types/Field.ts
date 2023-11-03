import Arena from './Arena'
import Entity from './Entity'

export default interface Field extends Entity {
  name: string
  price: number
  openIn: number
  closeIn: number
  sports: string
  arenaId: string
  arena?: Arena
}
