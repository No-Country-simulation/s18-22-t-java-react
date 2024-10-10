'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const specialities = ['Cardiología', 'Dermatología', 'Pediatría', 'Neurología', 'Traumatología']
const places = ['Primer Consultorio', 'Segundo Consultorio', 'Tercer Consultorio']

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [speciality, setSpeciality] = useState(searchParams.get('speciality') || '')
  const [place, setPlace] = useState(searchParams.get('place') || '')

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
      params.delete('speciality')
      params.delete('place')
      setSpeciality('')
      setPlace('')
    } else {
      params.delete('q')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  function handleSpecialityChange(speciality: string) {
    const params = new URLSearchParams(searchParams)
    setSpeciality(speciality)

    if (speciality) {
      params.set('speciality', speciality)
      params.delete('q')
      params.delete('place')
      setPlace('')
    } else {
      params.delete('speciality')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  function handlePlaceChange(place: string) {
    const params = new URLSearchParams(searchParams)
    setPlace(place)

    if (place) {
      params.set('place', place)
      params.delete('q')
      params.delete('speciality')
      setSpeciality('')
    } else {
      params.delete('place')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const debouncedFunction = debounce(handleSearch, 1000)

  return (
    <div className="flex flex-col gap-4 mb-2">
      {/* Búsqueda por nombre */}
      <div className="relative flex">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="block w-full rounded border border-gray-400 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          name="search"
          id="search"
          onChange={(e) => {
            debouncedFunction(e.target.value)
          }}
          defaultValue={searchParams.get('q')?.toString()}
        />
      </div>

      <div className="relative flex">
        <label htmlFor="speciality" className="sr-only">
          Speciality
        </label>
        <select
          className="block w-full rounded border border-gray-400 py-[9px] text-sm outline-2 placeholder:text-gray-500"
          name="speciality"
          id="speciality"
          value={speciality}
          onChange={(e) => handleSpecialityChange(e.target.value)}
        >
          <option value="">Selecciona una especialidad</option>
          {specialities.map((speciality) => (
            <option key={speciality} value={speciality}>
              {speciality}
            </option>
          ))}
        </select>
      </div>

      <div className="relative flex">
        <label htmlFor="place" className="sr-only">
          Place
        </label>
        <select
          className="block w-full rounded border border-gray-400 py-[9px] text-sm outline-2 placeholder:text-gray-500"
          name="place"
          id="place"
          value={place}
          onChange={(e) => handlePlaceChange(e.target.value)}
        >
          <option value="">Selecciona un lugar</option>
          {places.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
