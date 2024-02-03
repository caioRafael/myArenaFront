import { Label } from '@/components/ui/label'
import Arena from '@/types/Arena'

interface ArenaProfileContainerProps {
  arena: Arena
}

export default function ArenaProfileContainer(
  props: ArenaProfileContainerProps,
) {
  const { arena } = props
  return (
    <div className="flex flex-col space-y-10">
      <h1>Arena</h1>
      <div>
        <Label>Rasão social:</Label>
        <p>{arena.corporateName}</p>
      </div>
      <div>
        <Label>Nome fantasia:</Label>
        <p>{arena.fantasyName}</p>
      </div>
      <div>
        <Label>Endereço:</Label>
        <p>{arena.address}</p>
      </div>
      <div>
        <Label>Telefone:</Label>
        <p>{arena.phone}</p>
      </div>
      <div>
        <Label>CNPJ:</Label>
        <p>{arena.cnpj}</p>
      </div>
    </div>
  )
}
