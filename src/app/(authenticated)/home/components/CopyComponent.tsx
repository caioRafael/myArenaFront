'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Copy } from 'lucide-react'

interface CopyComponentProps {
  arenaId: string
}

export function CopyComponent(props: CopyComponentProps) {
  const { arenaId } = props
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${arenaId}`)
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
