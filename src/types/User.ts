import Entity from './Entity'

export default interface User extends Entity {
  name: string
  nickname: string
  email: string
  password?: string
}
