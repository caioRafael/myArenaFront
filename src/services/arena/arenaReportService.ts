import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ArenaReport } from '.'

export class ArenaReportService
  implements ResourceService<ArenaReport, ArenaReport>
{
  baseApi: IBaseApi<ArenaReport, ArenaReport>

  constructor(baseApi: IBaseApi<ArenaReport, ArenaReport>) {
    this.baseApi = baseApi
  }

  findQuery(): Promise<ArenaReport[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(id: string, token: string): Promise<ArenaReport[]> {
    const response = await this.baseApi.getAll(`/arena/report/${id}`, token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<ArenaReport | null> {
    const response = await this.baseApi.getOne(`/arena/report/${id}`, token)

    return response.data
  }

  async create(): Promise<ArenaReport | null> {
    throw new Error('Method not implemented.')
  }

  async update(): Promise<ArenaReport | null> {
    throw new Error('Method not implemented.')
  }

  pratialUpdate(
    data: Partial<ArenaReport>,
    ...args: unknown[]
  ): Promise<ArenaReport | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<ArenaReport | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<ArenaReport | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: ArenaReport): ArenaReport {
    return executionTest
  }

  commandToQuery(executionTest: ArenaReport): ArenaReport {
    return executionTest
  }
}
