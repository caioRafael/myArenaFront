import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import User, { UserProfileEnum, UserProfileRecord } from '@/types/User'
import { EmployeeDetailSheet } from './EmployeeDetailSheet'

interface EmployeeCardProps {
  user: User
}

export function EmployeeCard(props: EmployeeCardProps) {
  const { user } = props

  return (
    <Card className="w-80 h-44">
      <CardHeader className="flex flex-row gap-2 items-center p-2">
        <Avatar>
          <AvatarFallback>
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
          <b>Perfil:</b> {UserProfileRecord[user.profile as UserProfileEnum]}
        </p>
      </div>
      <CardFooter className="flex">
        <EmployeeDetailSheet user={user} />
      </CardFooter>
    </Card>
  )
}
