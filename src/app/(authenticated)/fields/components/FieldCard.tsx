import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Field from '@/types/Field'

interface FieldCardProps {
  field: Field
}

export function FieldCard(props: FieldCardProps) {
  const { field } = props

  function formatarDataBrasileira(data: Date): string {
    const opcoesDeFormatacao: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Sao_Paulo',
    }

    const formatador = new Intl.DateTimeFormat(
      'pt-BR',
      opcoesDeFormatacao,
    ).format(data)
    return formatador
  }

  return (
    <Card className="min-w-[300px]">
      <CardHeader className="p-4">{field.name}</CardHeader>
      <Separator />
      <CardContent className="my-2">
        <div>
          <h1>Preço por hora:</h1>
          {field.price}
        </div>
        <div>
          <h1>Horarios:</h1>
          {formatarDataBrasileira(new Date(field.openIn))} -{' '}
          {formatarDataBrasileira(new Date(field.closeIn))}
        </div>
        <div>
          <h1>Esportes:</h1>
          {field.sports}
        </div>
      </CardContent>
      <CardFooter>
        <Button>Detalhar</Button>
      </CardFooter>
    </Card>
  )
}
