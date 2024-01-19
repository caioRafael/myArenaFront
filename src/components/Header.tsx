import { getUser } from '@/lib/newAuth'
import { MobileSidbar } from './MobileSidbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import TypeRouteEnum from '@/types/enum/TypeRouteEnum'
import { redirect } from 'next/navigation'

interface HeaderProps {
  username: string
}

export async function Header(props: HeaderProps) {
  const { username } = props
  const user = await getUser(TypeRouteEnum.ARENA_ROUTE)

  if (!user) {
    redirect('/')
  }

  const { arena, profile } = user

  const initalsName = username.split(' ') as string[]
  return (
    <div className="w-full h-20 flex items-center justify-between p-4 border-b border-border bg-primary">
      <MobileSidbar
        username={username}
        arena={arena?.fantasyName as string}
        currentProfile={profile}
      />

      <h1 className="font-semibold text-3xl">
        <span className="text-white">My</span> Arena
      </h1>

      <div className="hidden md:flex items-center gap-3 ">
        <h1 className="text-white font-semibold">{username.toUpperCase()}</h1>
        <Avatar>
          <AvatarFallback>
            {initalsName[0].charAt(0).toUpperCase()}
            {initalsName[1]?.charAt(0).toUpperCase()}
          </AvatarFallback>
          <AvatarImage src="" />
        </Avatar>
      </div>
    </div>
  )
}
