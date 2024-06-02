import Image from 'next/image'

export default function LoadingPages() {
  return (
    <div className="w-full h-page flex flex-col items-center justify-center">
      <Image
        width={500}
        height={300}
        src={'/load-image.svg'}
        alt="load image"
      />
      <h1 className="text-2xl font-bold">Carregando informações</h1>
    </div>
  )
}
