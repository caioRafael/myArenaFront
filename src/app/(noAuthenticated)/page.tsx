import Link from 'next/link'
import { LoginFormContainer } from './components/LoginFormContainer'

interface LoginPageProps {
  searchParams?: {
    redirectTo?: string
  }
}

export default function LoginPage(props: LoginPageProps) {
  const { searchParams } = props

  // console.log(
  //   searchParams?.redirectTo === undefined
  //     ? 'sign-up'
  //     : `client/sign-up/?arenaId=${searchParams?.redirectTo}`,
  // )
  return (
    <>
      {searchParams?.redirectTo && (
        <h1 className="text-red-500">
          Antes de fazer um agendamento faça seu login
        </h1>
      )}
      <LoginFormContainer />
      <p>
        Não tem conta?{' '}
        <Link
          href={
            searchParams?.redirectTo !== undefined
              ? 'sign-up'
              : `client/sign-up/?arenaId=${searchParams?.redirectTo}`
          }
          className="underline hover:text-primary transition-all"
        >
          cadastre sua arena 123
        </Link>
      </p>
    </>
  )
}
