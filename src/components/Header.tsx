import { getUser } from '@/lib/newAuth'
import { MobileSidebar } from './MobileSidebar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import TypeRouteEnum from '@/types/enum/TypeRouteEnum'
import { redirect } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ChevronDown, User } from 'lucide-react'
import Link from 'next/link'

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
      <MobileSidebar
        username={username}
        arena={arena?.fantasyName as string}
        currentProfile={profile}
      />

      <h1 className="font-semibold text-3xl">
        <span className="text-white">My</span> Arena
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="hidden md:flex items-center gap-3 ">
            <h1 className="text-white font-semibold">
              {username.toUpperCase()}
            </h1>
            <Avatar>
              <AvatarFallback>
                {initalsName[0].charAt(0).toUpperCase()}
                {initalsName[1]?.charAt(0).toUpperCase()}
              </AvatarFallback>
              <AvatarImage src="" />
            </Avatar>
            <ChevronDown className="text-white" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link className="flex gap-3" href={'/profile'}>
              <User />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
