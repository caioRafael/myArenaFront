import { AppPage } from '@/components/AppPage'
import { CopyComponent } from './components/CopyComponent'
import { getUser } from '@/lib/auth'
import { Card } from '@/components/ui/card'
import { SchedulesItemsContainer } from './components/SchedulesItemsContainer'
// import { Separator } from '@/components/ui/separator'
import { ReportContainer } from './components/ReportContainer'
import { UserProfileEnum } from '@/types/User'

export default async function Home() {
  const { arena, token, profile } = await getUser()
  return (
    <AppPage
      title="Dashboard"
      topRightContainer={<CopyComponent arenaId={arena.id as string} />}
      className="flex flex-col gap-3"
    >
      <Card className="hidden md:flex p-4 items-center justify-between">
        <b>{arena.fantasyName}</b>
        <b>{arena.phone}</b>
        <b>{arena.address}</b>
      </Card>

      {profile === UserProfileEnum.ADMINISTRATOR && (
        <ReportContainer arenaId={arena.id as string} token={token} />
      )}
      {/* <Separator className="h-1" /> */}
      <h1 className="text-lg font-semibold">Agendamentos do dia:</h1>
      <SchedulesItemsContainer arenaId={arena.id as string} token={token} />
    </AppPage>
  )
}
