'use client'

import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdministratorForm } from './AdministratorForm'
import { ArenaForm } from './ArenaForm'
import { AdministrateSchema, ArenaSignUpSchema } from './ArenaSignUpSchema'
import { arenaQueryService } from '@/services/arena'

export function FormContent() {
  const router = useRouter()

  const [stage, setStage] = useState<number>(1)
  const [arenaData, setArenaData] = useState<ArenaSignUpSchema>({
    address: '',
    cnpj: '',
    corporateName: '',
    fantasyName: '',
    phone: '',
    pixKey: '',
    requirePrePayment: false,
  })
  const [administratorData, setAdministratorData] =
    useState<AdministrateSchema>({
      confirmPassword: '',
      email: '',
      name: '',
      nickname: '',
      password: '',
      phone: '',
    })

  const { mutateAsync, isPending } = arenaQueryService.useCreate()

  const handleCreateArena = async () => {
    const response = await mutateAsync({
      ...arenaData,
      administrator: administratorData,
    })

    if (response) router.replace('/')
  }
  return (
    <div className="flex flex-col items-center justify-center w-full p-3 gap-5 border border-border rounded-md">
      <h1>Cadastre sua arena</h1>

      <Progress value={stage === 1 ? 50 : 100} />
      <p className="self-start">
        Dados {stage === 1 ? 'da arena' : 'do administrador'}
      </p>

      {stage === 1 ? (
        <ArenaForm
          arenaData={arenaData}
          setArenaData={setArenaData}
          setStage={setStage}
        />
      ) : (
        <AdministratorForm
          administratorData={administratorData}
          setAdministratorData={setAdministratorData}
          setStage={setStage}
          isPending={isPending}
          handleCreateArena={handleCreateArena}
        />
      )}
    </div>
  )
}
