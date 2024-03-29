import { jwtDecode } from 'jwt-decode'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import DecodedTokenReturn from '@/types/DecodedTokenReturn'
import { api } from './api/api'
import Arena from '@/types/Arena'

export async function getUser() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }
  const decodedToken: DecodedTokenReturn = await jwtDecode(session.access_token)

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
