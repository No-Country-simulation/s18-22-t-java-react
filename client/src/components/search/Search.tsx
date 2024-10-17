'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { IconSearch } from '../icons'

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>

    return (...args: Parameters<T>): void => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const debouncedFunction = debounce(handleSearch, 1000)

  return (
    <div className="flex flex-col gap-4 mb-2 mt-14">
      <div className="relative flex flex-col">
        <label htmlFor="search" className='text-[32px] font-medium mb-4 text-[#1A2C33]'>
          Reservá tu próximo turno
        </label>
        <input
          className="block w-full rounded-3xl border border-gray-400 bg-[#F6F7F7] px-8 py-6 text-sm outline-2 placeholder:text-gray-500 placeholder:text-xl drop shadow-3xl"
          placeholder={placeholder}
          name="search"
          id="search"
          onChange={(e) => {
            debouncedFunction(e.target.value)
          }}
          defaultValue={searchParams.get('q')?.toString()}
        />
        <IconSearch color='#004784' size={50} className='absolute p-1 right-5 top-[72px] text-[#1A2C33]' />
      </div>
    </div>
  )
}
