import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Field from '@/types/Field'
import { convertNumberInHour } from '@/utils/convetHourInDate'
import { FieldDetailsSheet } from './FieldDetailsSheet'

interface FieldCardProps {
  field: Field
}

export function FieldCard(props: FieldCardProps) {
  const { field } = props

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
          {convertNumberInHour(field.openIn)} -{' '}
          {convertNumberInHour(field.closeIn)}
        </div>
        <div>
          <h1>Esportes:</h1>
          {field.sports}
        </div>
      </CardContent>
      <CardFooter>
        <FieldDetailsSheet field={field} />
      </CardFooter>
    </Card>
  )
}
