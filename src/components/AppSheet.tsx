import { ReactElement, ReactNode } from 'react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'

interface AppSheetProps {
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
}

export function AppSheet(props: AppSheetProps) {
  const {
    children,
    open,
    setOpen,
    textButton,
    title,
    variantButton,
    action,
    textAction,
  } = props
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={variantButton}>{textButton}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">{title}</SheetHeader>
        {children}
        <SheetFooter className="mt-10 gap-2">
          <Button variant={'outline'} onClick={() => setOpen(false)}>
            Fechar
          </Button>
          {action && textAction && (
            <Button onClick={action}>{textAction}</Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
