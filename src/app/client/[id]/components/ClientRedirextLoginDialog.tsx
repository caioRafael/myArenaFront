import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'

export function ClientRedirextLoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agendar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Antes realize seu login</DialogTitle>
        <div>
          <p>
            Antes de agendar um horário realize o seu login, ou crie uma conta
          </p>
        </div>
        <DialogFooter className="flex flex-wrap gap-3">
          <Link
            href={'/'}
            className="flex items-center justify-center h-10 bg-primary p-4 font-semibold text-white rounded-md"
          >
            Realizar login
          </Link>
          <Link
            href={'sign-up'}
            className="flex items-center justify-center h-10 border border-primary p-4 font-semibold text-primary rounded-md"
          >
            Criar conta
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
