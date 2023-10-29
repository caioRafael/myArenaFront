import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full p-3 gap-5 border border-border rounded-md">
        <h1>Realize seu login</h1>
        <div className="flex flex-col w-full gap-2">
          <Label>Email</Label>
          <Input placeholder="Email" type="email" />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Senha</Label>
          <Input placeholder="Senha" type="password" />
        </div>
        <Button>Login</Button>
      </div>
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
