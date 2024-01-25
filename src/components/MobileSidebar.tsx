'use client'

import { useState } from 'react'
import { SideBar } from './SideBar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import { UserProfileEnum } from '@/types/User'

interface MobileSidebarProps {
  username: string
  arena: string
  currentProfile: UserProfileEnum
}

export function MobileSidebar(props: MobileSidebarProps) {
  const { username, arena, currentProfile } = props
  const [open, setOpen] = useState<boolean>(false)

  const initalsName = username.split(' ') as string[]
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant={'link'} className="text-white">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <div className="flex items-center gap-3 ">
            <Avatar>
              <AvatarFallback>
                {initalsName[0].charAt(0).toUpperCase()}
                {initalsName[1]?.charAt(0).toUpperCase()}
              </AvatarFallback>
              <AvatarImage src="" />
            </Avatar>
            <h1 className=" font-semibold">{username.toUpperCase()}</h1>
          </div>
        </SheetHeader>
        <SideBar
          isMobile
          closeSheet={setOpen}
          arena={arena}
          currentProfile={currentProfile}
        />
      </SheetContent>
    </Sheet>
  )
}
