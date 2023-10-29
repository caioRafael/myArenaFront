import Entity from './Entity'
import User from './User'

export default interface Arena extends Entity {
  fantasyName: string
  corporateName?: string
  cnpj?: string
  phone: string
  address: string
  administratorId?: string
  administrator: User
}
