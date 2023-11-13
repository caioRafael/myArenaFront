import { BaseApi } from '@/lib/api/BaseApi'
import User from '@/types/User'
import { UserService } from './userService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'

const baseApi = new BaseApi<User, User>()
export const userService = new UserService(baseApi)
export const userQueryService = new ResourceQueryService('user', userService)
