'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { userQueryService } from '@/services/user'
import { UserProfileEnum, UserProfileRecord } from '@/types/User'
import { EmployeeDetailSheet } from './EmployeeDetailSheet'
import { EmployeeCard } from './EmployeeCard'

interface EmployeeContainerListProps {
  token: string
  arenaId: string
}

export function EmployeeContainerList(props: EmployeeContainerListProps) {
  const { arenaId, token } = props
  const { data } = userQueryService.useFindAll(arenaId, token)
  return (
    <div className="w-full flex justify-center md:justify-start gap-2 flex-wrap">
      {data?.map((user) => <EmployeeCard user={user} key={user.id} />)}
    </div>
  )
}
