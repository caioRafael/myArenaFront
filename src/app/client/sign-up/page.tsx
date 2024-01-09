import Image from 'next/image'

import ClientSignUpImage from '@/assets/client-sign-up.svg'
import ClientForm from './components/ClientForm'

interface ClientSignUpPageProps {
  searchParams?: {
    redirectTo?: string
  }
}

export default function ClientSignUpPage(props: ClientSignUpPageProps) {
  const { searchParams } = props
  return (
    <div className="grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] w-full h-full">
      <div className="hidden md:flex w-full h-full items-center justify-center">
        <Image
          height={1000}
          width={600}
          src={ClientSignUpImage}
          alt="Inital image"
        />
      </div>
      <div className="flex flex-col p-10 items-center justify-center gap-7">
        <h1 className="font-semibold text-3xl">
          <span className="text-primary">My</span> Arena
        </h1>

        <ClientForm redirectTo={searchParams?.redirectTo} />
      </div>
    </div>
  )
}
