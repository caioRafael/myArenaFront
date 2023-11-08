import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Field from '@/types/Field'

export class ArenaReportService implements ResourceService<Field, Field> {
  baseApi: IBaseApi<Field, Field>

  constructor(baseApi: IBaseApi<Field, Field>) {
    this.baseApi = baseApi
  }

  findQuery(): Promise<Field[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(id: string, token: string): Promise<Field[]> {
    const response = await this.baseApi.getAll(`/arena/report/${id}`, token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<Field | null> {
    const response = await this.baseApi.getOne(`/arena/report/${id}`, token)

    return response.data
  }

  async create(): Promise<Field | null> {
    throw new Error('Method not implemented.')
  }

  async update(): Promise<Field | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Field | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Field | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Field): Field {
    return executionTest
  }

  commandToQuery(executionTest: Field): Field {
    return executionTest
  }
}
