import { arenaService } from '@/services/arena'

interface ClientPageProps {
  params: {
    id: string
  }
}

export default async function ClientPage(props: ClientPageProps) {
  const { params } = props
  const data = await arenaService.findOne(params.id)
  return (
    <div className="flex flex-col w-full h-full items-center gap-3 p-3">
      <h1 className="text-2xl font-semibold">{data?.fantasyName}</h1>
    </div>
  )
}
