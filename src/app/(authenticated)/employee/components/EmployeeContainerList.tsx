'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { userQueryService } from '@/services/user'
import { UserProfileEnum, UserProfileRecord } from '@/types/User'

interface EmployeeContainerListProps {
  token: string
  arenaId: string
}

export function EmployeeContainerList(props: EmployeeContainerListProps) {
  const { arenaId, token } = props
  const { data } = userQueryService.useFindAll(arenaId, token)
  return (
    <div className="w-full flex justify-center md:justify-start gap-2 flex-wrap">
      {data?.map((user) => (
        <Card key={user.id as string} className="w-80 h-44">
          <CardHeader className="flex flex-row gap-2 items-center p-2">
            <Avatar>
              <AvatarFallback>
                {/* {initalsName[0].charAt(0).toUpperCase()}
                {initalsName[1]?.charAt(0).toUpperCase()} */}
                {user.name.split(' ')[0].charAt(0).toUpperCase()}
                {user.name.split(' ')[1]?.charAt(0).toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={user.avatar} />
            </Avatar>
            <div>
              <h1>{user.nickname}</h1>
              <h1>{user.email}</h1>
            </div>
          </CardHeader>
          <div className="p-3">
            <p>
              <b>Perfil:</b>{' '}
              {UserProfileRecord[user.profile as UserProfileEnum]}
            </p>
          </div>
          <CardFooter className="flex">
            <Button>Detalhar</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
