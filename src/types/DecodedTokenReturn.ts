import Entity from './Entity'

export default interface DecodedTokenReturn extends Entity {
  sub: string
  username: string
}
