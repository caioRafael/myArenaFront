'use client'

import { fieldQueryService } from '@/services/fields'

interface FieldsContainersProps {
  arenaId: string
  token: string
}

export function FieldsContainers(props: FieldsContainersProps) {
  const { arenaId, token } = props
  const { data } = fieldQueryService.useFindAll(arenaId, token)
  return (
    <div>
      <h1>ola mundo</h1>
      {JSON.stringify(data)}
    </div>
  )
}
