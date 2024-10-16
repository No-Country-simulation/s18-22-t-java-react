interface Props {
  className?: string
  size: 'normal' | 'big'
  variant: 'light' | 'dark'
  text: string
}

export function ButtonComponent({ className, size, variant, text }: Props) {
  const style = variant === 'light' ? 'bg-white text-[#004784]' : 'bg-[#004784] text-white '
  const sizing = size === 'normal' ? 'text-lg w-[220px] h-16' : 'text-[32px] w-[419px] h-24'

  return (
    <button type="button" className={`rounded-[64px] border border-[#004784] ${className} ${style} ${sizing}`}>
      {text}
    </button>
  )
}