import Link from 'next/link'
import { FormContent } from './components/FormContent'

export default async function SignUpPage() {
  return (
    <>
      <FormContent />
      <p>
        Já tem conta?{' '}
        <Link
          href={'/'}
          className="underline hover:text-primary transition-all"
        >
          faça seu login
        </Link>
      </p>
    </>
  )
}
