'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Home, LandPlot, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { signOut } from 'next-auth/react'

interface SideBarProps {
  isMobile?: boolean
}

export function SideBar(props: SideBarProps) {
  const { isMobile = false } = props
  const pathname = usePathname()
  const currentPage = pathname.split('/')[1]
  const router = useRouter()

  const goToPage = (route: string) => {
    router.push(`/${route}`)
  }

  async function logout() {
    await signOut({
      redirect: false,
    })

    router.replace('/')
  }

  const routes = [
    {
      name: 'Inicio',
      key: 'home',
      route: 'home',
      icon: <Home />,
    },
    {
      name: 'Quadras',
      key: 'fields',
      route: 'fields',
      icon: <LandPlot />,
    },
  ]

  return (
    <aside
      className={`${isMobile ? 'flex' : 'hidden'} md:${
        isMobile ? 'hidden' : 'flex'
      } flex-col flex-1 px-4 py-10 gap-2 border-r`}
    >
      {routes.map((route) => (
        <>
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
        </>
      ))}
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
