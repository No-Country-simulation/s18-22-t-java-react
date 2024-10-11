interface IconProps {
  className?: string
  size?: number
  color?: string
}

export const InfoIcon = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size || '3em'} height={size || '3em'} viewBox="0 0 16 16">
      <path fill={color || 'currentColor'} d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2" />
    </svg>
  )
}

export const WarningIcon = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size || '3em'} height={size || '3em'} viewBox="0 0 16 16">
      <path fill={color || 'currentColor'} d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
    </svg>
  )
}

export const DangerIcon = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size || '3em'} height={size || '3em'} viewBox="0 0 16 16">
      <path fill={color || 'currentColor'} d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
    </svg>
  )
}