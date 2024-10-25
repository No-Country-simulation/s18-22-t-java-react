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
    <svg className={className} width={size ? size : "32"} height={size ? size : "32"} viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.75 27.8906L21.25 19.9219M24.0833 13.2812C24.0833 18.4158 19.6435 22.5781 14.1667 22.5781C8.68984 22.5781 4.25 18.4158 4.25 13.2812C4.25 8.14673 8.68984 3.98438 14.1667 3.98438C19.6435 3.98438 24.0833 8.14673 24.0833 13.2812Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>


  )
}

export const IconPlaceMarker = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} width={size ? size : "22"} height={size ? size : "22"} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55533 4.45547C8.56236 1.44844 13.4377 1.44844 16.4448 4.45547C19.4518 7.46251 19.4518 12.3379 16.4448 15.3449L11 20.7896L5.55533 15.3449C2.54829 12.3379 2.54829 7.46251 5.55533 4.45547ZM11 12.1002C12.2151 12.1002 13.2 11.1152 13.2 9.9002C13.2 8.68517 12.2151 7.7002 11 7.7002C9.78502 7.7002 8.80005 8.68517 8.80005 9.9002C8.80005 11.1152 9.78502 12.1002 11 12.1002Z" fill={color || "#111827"} />
    </svg>
  )
}

export const IconBackArrow = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} width={size ? size : "40"} height={size ? size : "40"} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <circle cx="20" cy="20" r="20" fill={color || "#004784"} />
      <rect x="8" y="8" width="24" height="24" fill="url(#pattern0_413_307)" />
      <defs>
        <pattern id="pattern0_413_307" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_413_307" transform="scale(0.0111111)" />
        </pattern>
        <image id="image0_413_307" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACX0lEQVR4nO2dsYpTQRRAs0ZksRBEG2GtF7HcagvrgPoLSeU3mP2HNRu/wEobrbXwD2zsbCxsFIRdwWghKi5HAtoIYubKu5N5OacO5HICk5y8mfcGAxEREREREekG4BxwH3jL3/kAzJav7WiMfgNsAY9YnVntmZsEmFLGSe2ZmwO4BZwqulvJ14BPlHPU5Vy9ArgIvA5Ifgmcrz1/EwBD4FlA8ntgp/b8zQDMA5K/ATdqz94MwIQYd2rP3gzAPvA1INnfzasCXAHeBSQ/B86u/EabDLANvAhIfgNcrj1/X/P6N5+B67XnbwbggHKWpXi79uzNAIyAHwHRd2vP3gzALrAISH68XG5qz98EmNcpkofmdY7oeWC5MK8LJU+IYV4XSN43rzsG87p7MK9TJG+Z1zmiDwJffOZ1oeSRed0xmNfdg3mdInloXueInge+/MzrQskTYpjXBZLN664xr9c/ry9lzNgLgHsByYvlLtHaszcFcFwo+dSr14peX4BDl44E/K85EX/eJQLsAV8Cy4hnTQKyx8QwwQOyZwHR3z0SUS76DPA0eMjnavEnu8kAF4BXAdkeWwvuFP0YkP3EnaJ5F2enxZ/spkP5Yfkl/h8SlP0gINvzKQHR2564SgI3OeaBmZ4qe0wMMz0gexYQbaYnZ/pO8RtuMpjpqbJ3zfQ82SMzPU/2NLBem+kRzPQkMNPzwExPlb3n1fQ82WNimOlJme4RjVLM9EQw09Nva7wILCNuNSsFuOmNutc304+zZusdwMMC0d4U9j8fD3L0j8eDnPw6wOTjQURERERERAZ/8BMXmYOMYh01GwAAAABJRU5ErkJggg==" />
      </defs>
    </svg>

  )
}

export const IconSliderArrow = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} width={size ? size : "40"} height={size ? size : "40"} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width={size ? size : "40"} height={size ? size : "40"} fill={color || "url(#pattern0_357_327)"} />
      <defs>
        <pattern id="pattern0_357_327" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_357_327" transform="scale(0.0111111)" />
        </pattern>
        <image id="image0_357_327" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAABG1JREFUeF7t3U9oVEccB/DvzyVpvej20EJJryL1KgYCvbVQmh56KKtgscTw5oUcAtIW1J721n9aT7m8eRgs3uLJ6qmHUnpQ8dBT8eihDZQaIaFQgk3yqwMvoEXr+yXvzfvN7Ow1v8nMfHbYfd/dmbeE9PAiQF56SZ0gQXtaBAk6QXsS8NRNWtEJ2pOAp27Sik7QngQ8dRP8ih4MBuP9fv9rAB8CeONZbsz8kIiurK2tnV9eXn7kyfapbkKHpizLrhLRyZp431prP61Z22hZ0NDGmLMAvhSIrFprXxXUN1YaLHSe5+8z83UA+wQaCVqAhSzL3iSi2wAOSNoBuGSt/UTYppHy4Fb0/Pz8K5ubm3cAHJIIENEvAN4qiuJvSbumaoOCHgwGvX6//z2A9yQAzPwHgGNlWf4uaddkbVDQeZ5fYuYzQoBHzPxOWZY/C9s1Wh4MdJZlH7trYensicgURVFK2zVdHwT03Nzc1Pb29o8AXhICdHbd/N9xqofO8/x1Zr4LYEKI/MPExMT0cDjcFLZrpVw19MzMzMtjY2M/AZgUzv4+EU0WRbEqbNdauWZoabzeQfoLwJS19tfW1Hbxj9VC53l+jpm/EM5pG8AH1tobwnatl6uENsa8+/i69yaAnkSAiM4WReE+yVP3UAc9Ozt7uNfrueR3UKi1bK09AYCF7byUq4IONV7XeabUQIccr4OCDjleBwMderwOAjqGeK0eOpZ4rRo6pnitGTqqeK0WOrZ4rRI6xnitDjrWeK0KOuZ4rQY69nitBjr2eK0CehTidefQoxKvO4UepXjdGfRe4vX4+PixxcXFh3UGH1JNKx/8Z1l2gYikG77XmXmqLMt7IQHWHWsr0MaYPwFINnyr/fa6LuSL6hL0i4Qa+ntb0N8A+Ew4xvTSIQTDXt4MtW3lks79efWtrGjXWbq8e5q8NWjXTZZlR4nIbQDfL1wZnZ01EY6zdnmr0G4UxphTAL6rPaKqUMsGcum4vb90PNmhMeYiAOlpqH+Y+e2uj0QEBT0cDvetrKy4Qz7TkoG7Qz5bW1uTS0tLv0naaaxt/aVjZ9ILCwsHNjY2bgE4IoHo+tiaZKz/V+sN2g2i+irLHcTsCydwzVp7XOtO0Tpz8QpdvTnuau8zgHPW2q/qTEpjjXfoClt6WN41C/rzkE6gq0BzmZlPC1efyvMpdebQGfSoxfTOoEctpncKPUoxvXPoUYnpKqAr7KhjuhrovcT0ru/Fofqq41mDizmmq1nRO/CxxnR10LHGdJXQMcZ0tdCxxXTV0DHFdNXQMcV09dCxxPQgoGOI6cFA7yGmpxsM1omuT9aEHNODWtEOPdSYHhx09ebobmvsti5I77vU2VazIKEr7Gkicpty0o26pa/B0vpd3Hr+gbX2NWk/TdQHu6J3Jm+MuQrgo5oYnd0UNnjo6udB3A8qDJ738yAAVpn5yvr6+ufp50FqLslQy4Jf0aHAJ2hPz1SCTtCeBDx1k1Z0gvYk4KmbtKITtCcBT938CwJIIXnKPetSAAAAAElFTkSuQmCC" />
      </defs>
    </svg>

  )
}

export const IconPencil = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} width={size ? size : "30"} height={size ? size : "30"} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.3787 5.37868C21.5503 4.20711 23.4497 4.20711 24.6213 5.37868C25.7929 6.55025 25.7929 8.44975 24.6213 9.62132L23.432 10.8107L19.1893 6.56802L20.3787 5.37868Z" fill="#111827" />
      <path d="M17.068 8.68934L4.5 21.2574V25.5H8.74264L21.3107 12.932L17.068 8.68934Z" fill={color || "#111827"} />
    </svg>


  )
}

export const IconX = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} width={size ? size : "24"} height={size ? size : "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.0248 0.992266C22.3423 0.309766 21.2398 0.309766 20.5573 0.992266L11.9998 9.53227L3.44227 0.974766C2.75977 0.292266 1.65727 0.292266 0.974766 0.974766C0.292266 1.65727 0.292266 2.75977 0.974766 3.44227L9.53227 11.9998L0.974766 20.5573C0.292266 21.2398 0.292266 22.3423 0.974766 23.0248C1.65727 23.7073 2.75977 23.7073 3.44227 23.0248L11.9998 14.4673L20.5573 23.0248C21.2398 23.7073 22.3423 23.7073 23.0248 23.0248C23.7073 22.3423 23.7073 21.2398 23.0248 20.5573L14.4673 11.9998L23.0248 3.44227C23.6898 2.77727 23.6898 1.65727 23.0248 0.992266Z" fill={color || "black"} />
    </svg>
  )
}

export const IconUser = ({ className, size, color }: IconProps) => {
  return (
    <svg className={className} width={size ? size : "24"} height={size ? size : "25"} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9998 10.3998C14.6508 10.3998 16.7998 8.25077 16.7998 5.5998C16.7998 2.94884 14.6508 0.799805 11.9998 0.799805C9.34884 0.799805 7.19981 2.94884 7.19981 5.5998C7.19981 8.25077 9.34884 10.3998 11.9998 10.3998Z" fill={color || "#025DAB"} />
      <path d="M0.799805 24.7998C0.799805 18.6142 5.81422 13.5998 11.9998 13.5998C18.1854 13.5998 23.1998 18.6142 23.1998 24.7998H0.799805Z" fill={color || "#025DAB"} />
    </svg>
  )
}
