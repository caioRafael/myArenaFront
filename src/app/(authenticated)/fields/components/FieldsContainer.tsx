'use client'

import { fieldQueryService } from '@/services/fields'
import { FieldCard } from './FieldCard'
import { Input } from '@/components/ui/input'
import { FieldSheetCreate } from './FieldSheetCreate'
import { EmptyState } from '@/components/EmptyState'

interface FieldsContainersProps {
  arenaId: string
  token: string
}

export function FieldsContainers(props: FieldsContainersProps) {
  const { arenaId, token } = props
  const { data } = fieldQueryService.useFindAll(arenaId, token)
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <Input
          placeholder="Pesquisa"
          className="w-full md:w-1/3"
          type="search"
        />
        <FieldSheetCreate arenaId={arenaId} token={token} />
      </div>
      <div className="w-full h-full flex flex-wrap gap-3 justify-center md:justify-start mt-10">
        {data &&
          data?.map((field) => <FieldCard key={field.id} field={field} />)}
        {data?.length === 0 && (
          <EmptyState message="Nenhuma quadra encontrada" />
        )}
      </div>
    </div>
  )
}
