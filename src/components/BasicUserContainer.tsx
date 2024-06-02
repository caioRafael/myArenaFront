import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface BasicUserContainerProps {
  name: string
  avatar?: string
}

export function BasicUserContainer(props: BasicUserContainerProps) {
  const { name, avatar } = props

  const initalsName = name.split(' ') as string[]
  return (
    <div className="hidden md:flex items-center gap-3 ">
      <h1 className="font-regular">{name.toUpperCase()}</h1>
      <Avatar>
        <AvatarFallback>
          {initalsName[0].charAt(0).toUpperCase()}
          {initalsName[1]?.charAt(0).toUpperCase()}
        </AvatarFallback>
        <AvatarImage src={avatar || ''} className="object-cover" />
      </Avatar>
      {/* <ChevronDown className="text-white" /> */}
    </div>
  )
}
