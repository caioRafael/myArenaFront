import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Arena from '@/types/Arena'

export class ArenaService implements ResourceService<Arena, Arena> {
  baseApi: IBaseApi<Arena, Arena>

  constructor(baseApi: IBaseApi<Arena, Arena>) {
    this.baseApi = baseApi
  }

  findQuery(): Promise<Arena[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<Arena[]> {
    throw new Error('Method not implemented.')
  }

  async findOne(id: string): Promise<Arena | null> {
    const response = await this.baseApi.getOne(`/arena/${id}`)

    return response.data
  }

  async create(data: Arena): Promise<Arena | null> {
    const response = await this.baseApi.post('/arena', data)

    return response.data as Arena
  }

  async update(): Promise<Arena | null> {
    throw new Error('Method not implemented.')
  }

  pratialUpdate(
    data: Partial<Arena>,
    ...args: unknown[]
  ): Promise<Arena | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Arena | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Arena | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Arena): Arena {
    return executionTest
  }

  commandToQuery(executionTest: Arena): Arena {
    return executionTest
  }
}
