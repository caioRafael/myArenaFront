import { ReactElement } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'

export interface IMenuOptions {
  key: string | number
  content: string | ReactElement
  onClick?: () => void
}

interface AppMenuProps {
  triggerContent?: string | ReactElement
  items: IMenuOptions[]
}

export default function AppMenu(props: AppMenuProps) {
  const { triggerContent, items } = props
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>{triggerContent || <MoreVertical />}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item.key} onClick={item.onClick}>
            {item.content}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
