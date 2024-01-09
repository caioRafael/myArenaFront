import Link from 'next/link'
import { LoginFormContainer } from './components/LoginFormContainer'

interface LoginPageProps {
  searchParams?: {
    redirectTo?: string
  }
}

export default function LoginPage(props: LoginPageProps) {
  const { searchParams } = props

  const isClient = !!searchParams?.redirectTo

  return (
    <>
      {isClient && (
        <h1 className="text-red-500">
          Antes de fazer um agendamento faça seu login
        </h1>
      )}
      <LoginFormContainer />
      <p>
        Não tem conta?{' '}
        <Link
          href={
            isClient
              ? `client/sign-up/?redirectTo=${searchParams?.redirectTo}`
              : 'sign-up'
          }
          className="underline hover:text-primary transition-all"
        >
          {isClient ? 'crie uma conta' : 'cadastre sua arena'}
        </Link>
      </p>
    </>
  )
}
