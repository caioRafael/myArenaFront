import { AppPage } from '@/components/AppPage'
import { CopyComponent } from './components/CopyComponent'
import { getUser } from '@/lib/auth'

export default async function Home() {
  const { arena } = await getUser()
  return (
    <AppPage
      title="Dashboard"
      topRightContainer={<CopyComponent arenaId={arena.id as string} />}
    >
      <h1>ola mundo</h1>
    </AppPage>
  )
}
