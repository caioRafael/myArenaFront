'use client'

import { fieldQueryService } from '@/services/fields'
import { FieldCard } from './FieldCard'
import { Input } from '@/components/ui/input'
import { FieldSheetCreate } from './FieldSheetCreate'
import { EmptyState } from '@/components/EmptyState'
import Field from '@/types/Field'
import { useCallback, useEffect, useState } from 'react'
import { Spin } from '@/components/Spin'

interface FieldsContainersProps {
  arenaId: string
  token: string
}

export function FieldsContainers(props: FieldsContainersProps) {
  const { arenaId, token } = props
  const { data, isLoading } = fieldQueryService.useFindAll(arenaId, token)

  const [fields, setFields] = useState<Field[]>(data || [])

  useEffect(() => {
    if (data) setFields(data)
  }, [data])

  const searchFields = useCallback(
    (searchValue: string) => {
      if (data) {
        const filterredList = data?.filter((fild) =>
          fild.name.toLowerCase().includes(searchValue),
        )

        setFields(filterredList)
      }
    },
    [fields, data],
  )

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spin />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <Input
          placeholder="Pesquisa por nome"
          className="w-full md:w-1/3"
          type="search"
          onChange={(e) => searchFields(e.target.value)}
        />
        <FieldSheetCreate arenaId={arenaId} token={token} />
      </div>
      <div className="w-full h-full flex flex-wrap gap-3 justify-center md:justify-start mt-10">
        {fields.map((field) => (
          <FieldCard key={field.id} field={field} />
        ))}
        {fields.length === 0 && (
          <EmptyState message="Nenhuma quadra encontrada" />
        )}
      </div>
    </div>
  )
}
