import { AppPage } from '@/components/AppPage'
import { getUser } from '@/lib/auth'
import { EmployeeContainerList } from './components/EmployeeContainerList'

export default async function EmployeePage() {
  const { token, arena } = await getUser()
  return (
    <AppPage title="Funcionários">
      <h1>ola mundo</h1>
      <EmployeeContainerList token={token} arenaId={arena.id as string} />
    </AppPage>
  )
}
