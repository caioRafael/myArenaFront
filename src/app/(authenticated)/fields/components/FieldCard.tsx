import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Field from '@/types/Field'
import { convertNumberInHour } from '@/utils/convetHourInDate'
import { FieldDetailsSheet } from './FieldDetailsSheet'
import { Badge } from '@/components/ui/badge'
interface FieldCardProps {
  field: Field
}

export function FieldCard(props: FieldCardProps) {
  const { field } = props

  const sportList = field.sports.split(', ')

  const formatPrice = (price: number) => {
    const opcoesDeFormatacao: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'BRL',
    }

    const formatador = new Intl.NumberFormat('pt-BR', opcoesDeFormatacao)
    return formatador.format(price as number)
  }

  return (
    <Card className="w-[300px]">
      <CardHeader className="p-4">{field.name}</CardHeader>
      <Separator />
      <CardContent className="my-2">
        <div>
          <h1>Preço por hora:</h1>
          {formatPrice(field.price)}
        </div>
        <div>
          <h1>Horários:</h1>
          {convertNumberInHour(field.openIn)} -{' '}
          {convertNumberInHour(field.closeIn)}
        </div>
        <div>
          <h1>Esportes:</h1>
          <div className="flex flex-row flex-wrap gap-1">
            {sportList.map((sport, index) =>
              index <= 2 ? (
                <Badge key={sport} className="flex gap-2 h-6">
                  {sport}
                </Badge>
              ) : (
                <></>
              ),
            )}
            {sportList.length > 3 && (
              <Badge className="flex gap-2 h-6">+{sportList.length - 3}</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <FieldDetailsSheet field={field} />
      </CardFooter>
    </Card>
  )
}
