import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Schedule from '@/types/Schedule'

export class ScheduleService implements ResourceService<Schedule, Schedule> {
  baseApi: IBaseApi<Schedule, Schedule>

  constructor(baseApi: IBaseApi<Schedule, Schedule>) {
    this.baseApi = baseApi
  }

  findQuery(): Promise<Schedule[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(
    arenaId: string,
    date: string,
    token: string,
  ): Promise<Schedule[]> {
    const response = await this.baseApi.getAll(
      `/schedule/arena/${arenaId}?date=${date}`,
      token,
    )

    return response.data
  }

  findOne(): Promise<Schedule | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: Schedule, token: string): Promise<Schedule | null> {
    const response = await this.baseApi.post('/schedule', data, token)

    return response.data as Schedule
  }

  async update(): Promise<Schedule | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Schedule | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Schedule | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Schedule): Schedule {
    return executionTest
  }

  commandToQuery(executionTest: Schedule): Schedule {
    return executionTest
  }
}
