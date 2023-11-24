import Link from 'next/link'
import { LoginFormContainer } from './components/LoginFormContainer'

interface LoginPageProps {
  searchParams?: {
    arenaId?: string
  }
}

export default function LoginPage(props: LoginPageProps) {
  const { searchParams } = props
  return (
    <>
      {searchParams?.arenaId && (
        <h1 className="text-red-500">
          Antes de fazer um agendamento faça seu login
        </h1>
      )}
      <LoginFormContainer />
      <p>
        Não tem conta?{' '}
        <Link
          href={'sign-up'}
          className="underline hover:text-primary transition-all"
        >
          cadastre sua arena
        </Link>
      </p>
    </>
  )
}
