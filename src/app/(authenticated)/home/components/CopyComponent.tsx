'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Copy } from 'lucide-react'

interface CopyComponentProps {
  arenaId: string
}

export function CopyComponent(props: CopyComponentProps) {
  const { arenaId } = props

  const copyUrl =
    process.env.ENVIROMENT === 'dev'
      ? `http://localhost:3000/client/${arenaId}`
      : `https://connectsport.vercel.app/${arenaId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(copyUrl)
    toast({
      title: 'Link copiado',
      description: 'Link de agendamento copiado com sucesso!',
    })
  }
  return (
    <Button onClick={handleCopyLink} className="flex gap-2">
      <Copy />
      Gerar link
    </Button>
  )
}
