import Arena from '@/types/Arena'
import { BaseApi } from '@/lib/api/BaseApi'
import { ArenaService } from './arenaService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'

const baseApi = new BaseApi<Arena, Arena>()
export const arenaService = new ArenaService(baseApi)
export const arenaQueryService = new ResourceQueryService('arena', arenaService)
