import { jwtDecode } from 'jwt-decode'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import DecodedTokenReturn from '@/types/DecodedTokenReturn'

export async function getUser() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) redirect('/')

  const decodedToken: DecodedTokenReturn = jwtDecode(session.access_token)

  const user = {
    token: session.access_token as string,
    id: decodedToken.sub,
    ...decodedToken,
  }

  return user
}
