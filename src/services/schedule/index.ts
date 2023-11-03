import { BaseApi } from '@/lib/api/BaseApi'
import Schedule from '@/types/Schedule'
import { ScheduleService } from './scheduleService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'

const baseApi = new BaseApi<Schedule, Schedule>()
export const scheduleService = new ScheduleService(baseApi)
export const scheduleQueryService = new ResourceQueryService(
  'schedules',
  scheduleService,
)
