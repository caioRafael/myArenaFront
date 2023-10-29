import Link from 'next/link'
import { LoginFormContainer } from './components/LoginFormContainer'

export default function LoginPage() {
  return (
    <>
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
