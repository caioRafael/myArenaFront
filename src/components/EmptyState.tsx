import Image from 'next/image'
import EmptyImage from '../assets/EmptyImage.svg'

interface EmptyStateProps {
  message?: string
}

export function EmptyState(props: EmptyStateProps) {
  const { message } = props
  return (
    <div className="flex flex-col gap-10 w-full items-center justify-center">
      <Image
        width={500}
        height={1000}
        className="w-full md:w-1/2 max-h-80"
        src={EmptyImage}
        alt="EmptyImage"
      />
      <h1 className="text-2xl font-semibold">
        {message || 'Nenhum dado encontrado'}
      </h1>
    </div>
  )
}
