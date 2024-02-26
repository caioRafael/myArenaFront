'use client'

import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdministratorForm } from './AdministratorForm'
import { ArenaForm } from './ArenaForm'
import {
  AdministrateSchema,
  ArenaSignUpSchema,
  LocalizationSchema,
} from './ArenaSignUpSchema'
import { arenaQueryService } from '@/services/arena'
import { LocalizationForm } from './LocalizationForm'

export function FormContent() {
  const router = useRouter()

  const [stage, setStage] = useState<number>(1)
  const [arenaData, setArenaData] = useState<ArenaSignUpSchema>({
    cnpj: '',
    corporateName: '',
    fantasyName: '',
    phone: '',
    pixKey: '',
    requirePrePayment: false,
  })
  const [localization, setLocalization] = useState<LocalizationSchema>({
    address: '',
    cep: '',
    city: '',
    locale: '',
    uf: '',
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
      ...localization,
      administrator: administratorData,
    })

    if (response) router.replace('/')
  }
  return (
    <div className="flex flex-col items-center justify-center w-full p-3 gap-5 border border-border rounded-md">
      <h1>Cadastre sua arena</h1>

      <Progress value={stage === 1 ? 33.3 : stage === 2 ? 66.6 : 100} />
      <p className="self-start">
        Dados{' '}
        {stage === 1
          ? 'da arena'
          : stage === 2
          ? 'de localização'
          : 'do administrador'}
      </p>

      {stage === 1 ? (
        <ArenaForm
          arenaData={arenaData}
          setArenaData={setArenaData}
          setStage={setStage}
        />
      ) : stage === 2 ? (
        <LocalizationForm
          localization={localization}
          setLocalization={setLocalization}
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
