interface Props {
  className?: string
  size: 'normal' | 'big'
  variant: 'light' | 'dark'
  text: string
  submit?: boolean
}

export function ButtonComponent({ className, size, variant, text, submit }: Props) {
  const style = variant === 'light' ? 'bg-white text-secondaryBlue-500' : 'bg-secondaryBlue-500 text-white '
  const sizing = size === 'normal' ? 'text-lg w-[220px] h-16' : 'text-[32px] w-[419px] h-24'

  return (
    <button type={`${submit ? 'submit' : 'button'}`} className={`rounded-[64px] border border-secondaryBlue-500 ${className} ${style} ${sizing}`}>
      {text}
    </button>
  )
}