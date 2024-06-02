import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="w-full h-page flex flex-col items-center justify-center">
      <Image width={500} height={300} src={'/not-found.svg'} alt="load image" />
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
    </div>
  )
}
