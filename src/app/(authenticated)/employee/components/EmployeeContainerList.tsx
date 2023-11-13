'use client'

import { Card, CardHeader } from '@/components/ui/card'
import { userQueryService } from '@/services/user'

interface EmployeeContainerListProps {
  token: string
  arenaId: string
}

export function EmployeeContainerList(props: EmployeeContainerListProps) {
  const { arenaId, token } = props
  const { data } = userQueryService.useFindAll(arenaId, token)
  return (
    <div className="w-full h-full flex gap-2">
      {data?.map((user) => (
        <Card key={user.id as string}>
          <CardHeader>
            <h1>{user.name}</h1>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
