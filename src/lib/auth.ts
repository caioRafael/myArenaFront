import { jwtDecode } from 'jwt-decode'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import User from '@/types/User'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export async function getUser() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) redirect('/')

  const decodedToken: User = jwtDecode(session.access_token)

  const user = {
    token: session.access_token,
    id: decodedToken.sub,
    ...decodedToken,
  }

  return user
}
