import { AppPage } from '@/components/AppPage'
import { getUser } from '@/lib/auth'
import { EmployeeContainerList } from './components/EmployeeContainerList'
import { EmployeeCreateSheet } from './components/EmployeeCreateSheet'

export default async function EmployeePage() {
  const { token, arena } = await getUser()
  return (
    <AppPage title="Funcionários">
      <div className="flex flex-row items-end justify-end mb-10">
        <EmployeeCreateSheet arenaId={arena.id as string} />
      </div>
      <EmployeeContainerList token={token} arenaId={arena.id as string} />
    </AppPage>
  )
}
