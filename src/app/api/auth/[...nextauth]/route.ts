import { api } from '@/lib/api/api'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await api.post('/login', {
          email: credentials?.email,
          password: credentials?.password,
        })

        if (response.data !== null) {
          return response.data
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/',
  },

  session: {
    maxAge: 60 * 60 * 12,
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      session = token.user as any
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
