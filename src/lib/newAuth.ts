import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import DecodedTokenReturn from '@/types/DecodedTokenReturn'
import TypeRouteEnum from '@/types/enum/TypeRouteEnum'
import { jwtDecode } from 'jwt-decode'
import { Session, getServerSession } from 'next-auth'
import { api } from './api/api'
import Arena from '@/types/Arena'
import { CurrentUser, UserProfileEnum } from '@/types/User'
import { redirect } from 'next/navigation'

export async function getUser(
  typeRoute: TypeRouteEnum,
): Promise<CurrentUser | null> {
  const session = await getServerSession(nextAuthOptions)

  // Caso usuário esteja altenticado e seja rota de arena
  // deve verificar se o usuário é um funcionário ou admnistrador
  // Caso seja continua no sistema
  // Caso não, redirecionar para rota de login
  if (session && typeRoute === TypeRouteEnum.ARENA_ROUTE) {
    const user = getUserArena(session)
    return user
  }

  // Caso usuário esteja autenticado na rota de cliente
  // deve permanecer na rota do cliente
  if (session && typeRoute === TypeRouteEnum.CLIENT_ROUTE) {
    const user = getUserClient(session)
    return user
  }

  // Caso usuário entre na rota do cliente e não esteja logado
  // Deve permanecer na rota
  if (!session && typeRoute === TypeRouteEnum.ARENA_ROUTE) {
    redirect('/')
  }

  return null
}

async function getUserArena(session: Session) {
  const decodedToken: DecodedTokenReturn = jwtDecode(session.access_token)

  if (decodedToken.profile !== UserProfileEnum.ADMINISTRATOR) {
    redirect('/client')
  }

  const { data } = await api.get(`/arena/user/${decodedToken.sub}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  })
  const user = {
    token: session.access_token as string,
    id: decodedToken.sub,
    ...decodedToken,
    arena: data as Arena,
  }

  return user
}

async function getUserClient(session: Session) {
  const decodedToken: DecodedTokenReturn = jwtDecode(session.access_token)

  const user = {
    token: session.access_token as string,
    id: decodedToken.sub,
    ...decodedToken,
  }

  return user
}
