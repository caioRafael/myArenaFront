import { getUser } from '@/lib/auth'
import { MobileSidebar } from './MobileSidebar'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Logotype from '@/assets/Logotype.svg'
import { UserProfileEnum } from '@/types/User'

interface HeaderProps {
  username: string
}

export async function Header(props: HeaderProps) {
  const { username } = props
  const user = await getUser()

  if (!user) {
    redirect('/')
  }

  const { arena, profile } = user

  return (
    <div className="w-full h-20 flex items-center justify-between md:justify-center p-4 border-b border-border bg-primary">
      <MobileSidebar
        username={username}
        arena={arena?.fantasyName as string}
        currentProfile={profile as UserProfileEnum}
        avatar={user.avatar || ''}
      />
      <Image src={Logotype} alt="logotype connect sport" />
    </div>
  )
}
