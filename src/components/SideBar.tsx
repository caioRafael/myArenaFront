'use client'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarCheck, Home, LandPlot, LogOut, Users } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { signOut } from 'next-auth/react'
import { UserProfileEnum } from '@/types/User'

interface SideBarProps {
  isMobile?: boolean
  closeSheet?: (value: boolean) => void
  arena: string | undefined
  currentProfile: UserProfileEnum
}

export function SideBar(props: SideBarProps) {
  const { isMobile = false, closeSheet, arena, currentProfile } = props
  const pathname = usePathname()
  const currentPage = pathname.split('/')[1]
  const router = useRouter()

  const goToPage = (route: string) => {
    router.push(`/${route}`)
    if (isMobile && closeSheet) closeSheet(false)
  }

  async function logout() {
    await signOut({
      redirect: false,
    })

    router.replace('/')
  }

  const routes = [
    {
      name: 'Início',
      key: 'home',
      route: 'home',
      icon: <Home />,
      hasPermission: currentProfile !== UserProfileEnum.CLIENT,
    },
    {
      name: 'Funcionários',
      key: 'employee',
      route: 'employee',
      icon: <Users />,
      hasPermission:
        currentProfile !== UserProfileEnum.CLIENT &&
        currentProfile === UserProfileEnum.ADMINISTRATOR,
    },
    {
      name: 'Quadras',
      key: 'fields',
      route: 'fields',
      icon: <LandPlot />,
      hasPermission: currentProfile !== UserProfileEnum.CLIENT,
    },
    {
      name: 'Agenda',
      key: 'schedule',
      route: 'schedules',
      icon: <CalendarCheck />,
      hasPermission: currentProfile !== UserProfileEnum.CLIENT,
    },
  ]

  return (
    <aside
      className={`${isMobile ? 'flex' : 'hidden'} md:${
        isMobile ? 'hidden' : 'flex'
      } flex-col flex-1 px-4 py-10 gap-2 border-r`}
    >
      <h1 className="self-center font-semibold mb-3">{arena?.toUpperCase()}</h1>

      {routes.map((route) => {
        if (route.hasPermission) {
          return (
            <div className="flex flex-col gap-2" key={route.key}>
              <Button
                key={route.key}
                variant={currentPage === route.route ? 'default' : 'ghost'}
                className="flex gap-2 justify-start"
                onClick={() => goToPage(route.route)}
              >
                {route.icon}
                {route.name}
              </Button>
              <Separator />
            </div>
          )
        } else {
          return <></>
        }
      })}
      <Button
        variant={'ghost'}
        className="flex gap-2 justify-start"
        onClick={logout}
      >
        <LogOut />
        Sair
      </Button>
    </aside>
  )
}
