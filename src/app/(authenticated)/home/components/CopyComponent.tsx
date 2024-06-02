'use client'

import { BasicUserContainer } from '@/components/BasicUserContainer'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Copy } from 'lucide-react'

interface CopyComponentProps {
  arenaId: string
  username: string
  avatar?: string
}

export function CopyComponent(props: CopyComponentProps) {
  const { arenaId, username, avatar } = props

  const copyUrl = `${process.env.COPY_URL}/${arenaId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(copyUrl as string)
    toast({
      title: 'Link copiado',
      description: 'Link de agendamento copiado com sucesso!',
    })
  }
  return (
    <div className="flex flex-col gap-3">
      <BasicUserContainer name={username} avatar={avatar} />
      <Button onClick={handleCopyLink} className="flex gap-2">
        <Copy />
        Gerar link
      </Button>
    </div>
  )
}
