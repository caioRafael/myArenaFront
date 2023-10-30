import { BaseApi } from '@/lib/api/BaseApi'
import Field from '@/types/Field'
import { FieldService } from './fieldService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'

const baseApi = new BaseApi<Field, Field>()
export const fieldService = new FieldService(baseApi)
export const fieldQueryService = new ResourceQueryService(
  'fields',
  fieldService,
)
