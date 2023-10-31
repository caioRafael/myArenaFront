import { getUser } from '@/lib/auth'
import { MobileSidbar } from './MobileSidbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface HeaderProps {
  username: string
}

export async function Header(props: HeaderProps) {
  const { username } = props
  const { arena } = await getUser()

  const initalsName = username.split(' ') as string[]
  return (
    <div className="w-full h-20 flex items-center justify-between p-4 border-b border-border bg-primary">
      <MobileSidbar username={username} arena={arena.fantasyName} />

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
