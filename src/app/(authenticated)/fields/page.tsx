import { AppPage } from '@/components/AppPage'
import { FieldsContainers } from './components/FieldsContainer'
import { getUser } from '@/lib/auth'

export default async function FieldsPage() {
  const { token, arena } = await getUser()
  return (
    <AppPage title={'Quadras'}>
      <FieldsContainers arenaId={arena.id as string} token={token} />
    </AppPage>
  )
}
