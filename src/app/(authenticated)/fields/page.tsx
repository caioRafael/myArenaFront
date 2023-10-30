import { AppPage } from '@/components/AppPage'
import { FieldsContainers } from './components/FieldsContainer'
import { getUser } from '@/lib/auth'

export default async function FieldsPage() {
  const { token } = await getUser()
  return (
    <AppPage title={'Quadras'}>
      <h1>ola mundo</h1>
      <FieldsContainers
        arenaId="301f4043-e627-41ac-91e8-8eea42bde4cf"
        token={token}
      />
    </AppPage>
  )
}
