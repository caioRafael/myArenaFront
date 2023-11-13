import Entity from './Entity'
import { UserProfileEnum } from './User'

export default interface DecodedTokenReturn extends Entity {
  sub: string
  username: string
  profile: UserProfileEnum
}
