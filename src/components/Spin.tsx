interface SpinProps {
  secondary?: boolean
}

export function Spin(props: SpinProps) {
  return (
    <div
      className={`w-5 h-5 border-4 rounded-3xl ${
        props.secondary ? 'border-primary' : 'border-gray-500'
      } border-t-4 border-t-white animate-spin`}
    ></div>
  )
}
