import { ReactElement, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'

interface AppModalProps {
  children: ReactNode
  textButton: string | ReactElement
  title: string
  open: boolean
  setOpen: (value: boolean) => void
  variantButton?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null

  action?: () => void
  textAction?: string
  disabledButton?: boolean
}

export function AppModal(props: AppModalProps) {
  const {
    children,
    open,
    setOpen,
    textButton,
    title,
    variantButton,
    action,
    textAction,
    disabledButton = false,
  } = props
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={variantButton}>{textButton}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        {children}
        <DialogFooter>
          <Button variant={'outline'} onClick={() => setOpen(false)}>
            Fechar
          </Button>
          {action && textAction && (
            <Button disabled={disabledButton} onClick={action}>
              {textAction}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
