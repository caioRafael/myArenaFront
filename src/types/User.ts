import Entity from './Entity'

export enum UserProfileEnum {
  ADMINISTRATOR = 'ADMINISTRATOR',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT',
}

export const UserProfileRecord: Record<UserProfileEnum, string> = {
  ADMINISTRATOR: 'Administrador',
  EMPLOYEE: 'Funcionário',
  CLIENT: 'Cliente',
}

export default interface User extends Entity {
  name: string
  nickname: string
  email: string
  password?: string
  prorfile: string
  avatar?: string
}
