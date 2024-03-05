import { AppPage } from '@/components/AppPage'
import { CopyComponent } from './components/CopyComponent'
import { getUser } from '@/lib/auth'
import { SchedulesItemsContainer } from './components/SchedulesItemsContainer'
import { ReportContainer } from './components/ReportContainer'
import { UserProfileEnum } from '@/types/User'
import { Separator } from '@/components/ui/separator'
import { unstable_cache as unstableCache } from 'next/cache'

const getCurrentUser = unstableCache(
  async () => {
    return await getUser()
  },
  [],
  {
    revalidate: 60 * 5,
  },
)

export default async function Home() {
  const { arena, token, profile, username } = await getCurrentUser()
  return (
    <AppPage
      title="Dashboard"
      hasNavigation={false}
      topRightContainer={
        arena.id ? (
          <CopyComponent arenaId={arena.id as string} username={username} />
        ) : (
          <></>
        )
      }
      className="flex flex-col gap-3"
    >
      {profile === UserProfileEnum.ADMINISTRATOR && (
        <ReportContainer arenaId={arena.id as string} token={token} />
      )}
      <Separator orientation="horizontal" />
      <h1 className="text-lg font-semibold">Agendamentos do dia:</h1>
      <SchedulesItemsContainer arenaId={arena.id as string} token={token} />
    </AppPage>
  )
}
