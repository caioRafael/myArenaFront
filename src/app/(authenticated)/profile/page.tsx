import { AppPage } from '@/components/AppPage'
import { getUser } from '@/lib/newAuth'
import TypeRouteEnum from '@/types/enum/TypeRouteEnum'
import { redirect } from 'next/navigation'
import UserProfileContainer from './components/UserProfileContainer'
import { Suspense } from 'react'
import { Spin } from '@/components/Spin'
import { Separator } from '@/components/ui/separator'
import ArenaProfileContainer from './components/ArenaProfileContainer'

export default async function ProfilePage() {
  const user = await getUser(TypeRouteEnum.ARENA_ROUTE)

  if (!user) {
    redirect('/')
  }

  return (
    <AppPage title="Perfil" className="flex flex-col gap-10">
      <Suspense fallback={<Spin />}>
        <UserProfileContainer userId={user.id} token={user.token} />
      </Suspense>
      <Separator />
      {user.arena && <ArenaProfileContainer arena={user.arena} />}
    </AppPage>
  )
}
