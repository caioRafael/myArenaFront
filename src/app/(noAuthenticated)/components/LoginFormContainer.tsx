'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Spin } from '@/components/Spin'

export function LoginFormContainer() {
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadding, setLoading] = useState<boolean>(false)

  async function handleLogin() {
    setLoading(true)
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setLoading(false)
      toast({
        title: 'Erro',
        description: result?.error,
        variant: 'destructive',
      })
    }

    router.replace('/home')
  }
  return (
    <div className="flex flex-col items-center justify-center w-full p-3 gap-5 border border-border rounded-md">
      <h1>Realize seu login</h1>
      <div className="flex flex-col w-full gap-2">
        <Label>Email</Label>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Label>Senha</Label>
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={handleLogin} disabled={loadding}>
        {loadding ? <Spin /> : 'Login'}
      </Button>
    </div>
  )
}
