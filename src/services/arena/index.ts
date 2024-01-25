import Arena from '@/types/Arena'
import { BaseApi } from '@/lib/api/BaseApi'
import { ArenaService } from './arenaService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { ArenaReportService } from './arenaReportService'

export interface ArenaReport {
  schedules: string
  espec: number
  revenue: number
}

const baseApi = new BaseApi<Arena, Arena>()
export const arenaService = new ArenaService(baseApi)
export const arenaQueryService = new ResourceQueryService('arena', arenaService)

const reportBaseApi = new BaseApi<ArenaReport, ArenaReport>()
export const arenaReportService = new ArenaReportService(reportBaseApi)
export const arenaReportQueryService = new ResourceQueryService(
  'report',
  arenaReportService,
)
