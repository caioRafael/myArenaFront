import { AppPage } from '@/components/AppPage'
import { SchedulesContainer } from './components/SchedulesContainer'
import { getUser } from '@/lib/auth'

export default async function SchedulePage() {
  const { token, arena } = await getUser()

  return (
    <AppPage title="Agenda">
      <SchedulesContainer token={token} arenaId={arena.id as string} />
    </AppPage>
  )
}
