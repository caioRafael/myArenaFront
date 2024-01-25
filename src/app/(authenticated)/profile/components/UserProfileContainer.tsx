import { EmptyState } from '@/components/EmptyState'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { userService } from '@/services/user'
import { UserProfileEnum, UserProfileRecord } from '@/types/User'
import { format } from 'date-fns'

interface UserProfileContainerProps {
  userId: string
  token: string
}

export default async function UserProfileContainer(
  props: UserProfileContainerProps,
) {
  const { userId, token } = props
  const user = await userService.findOne(userId, token)
  if (!user) {
    return <EmptyState message="Usuário não encontrado" />
  }

  const initalsName = user.name.split(' ') as string[]
  return (
    <div className="flex flex-col space-y-10">
      <div className="grid grid-cols-[16rem_1fr]">
        <div>
          <Avatar className="w-40 h-40">
            <AvatarFallback>
              {initalsName[0].charAt(0).toUpperCase()}
              {initalsName[1]?.charAt(0).toUpperCase()}
            </AvatarFallback>
            <AvatarImage src="" />
          </Avatar>
        </div>
        <div className="flex flex-col justify-center">
          <h1>{user.name}</h1>
          <h1>{UserProfileRecord[user.profile as UserProfileEnum]}</h1>
        </div>
      </div>
      <div className="flex flex-row gap-3 justify-around">
        <div>
          <Label>E-mail:</Label>
          <p>{user.email}</p>
        </div>
        <div>
          <Label>Telefone:</Label>
          <p>{user.email}</p>
        </div>
        <div>
          <Label>Apelido:</Label>
          <p>{user.nickname}</p>
        </div>
        <div>
          <Label>Data de cadastro:</Label>
          <p>{format(new Date(user.createdAt as string), 'dd/MM/yyyy')}</p>
        </div>
      </div>
    </div>
  )
}
