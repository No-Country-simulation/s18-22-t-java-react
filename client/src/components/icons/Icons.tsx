interface IconProps {
  className?: string
  size?: number
  color?: string
}

export const IconInfo = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size || '3em'} height={size || '3em'} viewBox="0 0 16 16">
      <path fill={color || 'currentColor'} d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2" />
    </svg>
  )
}

export const IconWarning = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size || '3em'} height={size || '3em'} viewBox="0 0 16 16">
      <path fill={color || 'currentColor'} d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
    </svg>
  )
}

export const IconDanger = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size || '3em'} height={size || '3em'} viewBox="0 0 16 16">
      <path fill={color || 'currentColor'} d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
    </svg>
  )
}

export const IconSearch = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} width={size ? size : "40"} height={size ? size : "40"} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="40" height="40" fill={color || 'url(#pattern0_52_422)'} />
      <defs>
        <pattern id="pattern0_52_422" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_52_422" transform="scale(0.0111111)" />
        </pattern>
        <image id="image0_52_422" width="90" height="90" xlinkHref="data:image/png;base64,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" />
      </defs>
    </svg>

  )
}

export const IconPlaceMarker = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} width={size ? size : "22"} height={size ? size : "22"} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width={size ? size : "22"} height={size ? size : "22"} fill={color || "url(#pattern0_81_779)"} />
      <defs>
        <pattern id="pattern0_81_779" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_81_779" transform="scale(0.0111111)" />
        </pattern>
        <image id="image0_81_779" width="90" height="90" xlinkHref="data:image/png;base64,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" />
      </defs>
    </svg>
  )
}