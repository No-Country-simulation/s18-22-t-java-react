interface Props {
  className?: string
  size: 'normal' | 'big' | 'large'
  variant: 'light' | 'dark' | 'main' | 'mainLight'
  text: string
  submit?: boolean
  onClick?: () => void
}

export function ButtonComponent({ className, size, variant, text, submit, onClick }: Props) {
  const style = variant === 'light' ? 'bg-white text-secondaryBlue-500 border border-secondaryBlue-500'
    : variant === 'dark' ? 'border border-secondaryBlue-500 bg-secondaryBlue-500 text-white'
      : variant === 'main' ? 'border border-blue-500 bg-blue-500 text-white'
        : 'border-2 border-blue-500 bg-white text-blue-500'
  const sizing = size === 'normal' ? 'text-lg w-[220px] h-16 rounded-[64px]' : size === 'big' ? 'text-[32px] w-[419px] h-24 rounded-[64px]' : 'w-[274px] h-16 rounded-xl'

  return (
    <button onClick={onClick} type={`${submit ? 'submit' : 'button'}`} className={`${className} ${style} ${sizing}`}>
      {text}
    </button>
  )
}