import { AppPage } from '@/components/AppPage'
import { Calendar } from './components/Calendar'
import { getUser } from '@/lib/auth'

export default async function SchedulePage() {
  const { token } = await getUser()
  return (
    <AppPage title="Agenda">
      <h1>agenda</h1>
      <Calendar token={token} />
    </AppPage>
  )
}
