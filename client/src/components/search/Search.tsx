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
        <label htmlFor="search" className='text-2xl mb-4'>
          Reservá tu próximo turno
        </label>
        <input
          className="block w-full rounded border border-gray-400 bg-gray-300 px-6 py-6 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          name="search"
          id="search"
          onChange={(e) => {
            debouncedFunction(e.target.value)
          }}
          defaultValue={searchParams.get('q')?.toString()}
        />
        <IconSearch className='absolute p-1 right-4 top-16' />
      </div>
    </div>
  )
}
