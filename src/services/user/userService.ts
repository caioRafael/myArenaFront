import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import User from '@/types/User'

export class UserService implements ResourceService<User, User> {
  baseApi: IBaseApi<User, User>

  constructor(baseApi: IBaseApi<User, User>) {
    this.baseApi = baseApi
  }

  findQuery(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(arenaId: string, token: string): Promise<User[]> {
    const response = await this.baseApi.getAll(`/user/arena/${arenaId}`, token)

    return response.data
  }

  findOne(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: User): Promise<User | null> {
    const response = await this.baseApi.post('/user', data)

    return response.data as User
  }

  async update(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async pratialUpdate(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: User): User {
    return executionTest
  }

  commandToQuery(executionTest: User): User {
    return executionTest
  }
}
