import { DoctorFromResponse } from '@/interfaces/user'
import { DoctorCard, PlaceCard, Placeholder, SpecialityCard } from "@/ui"

type Props = {
  query: string
  data: DoctorFromResponse[]
}

export const SearchResults: React.FC<Props> = async ({ query, data }) => {
  const getDoctorData = (data: DoctorFromResponse[]) => {
    const doctorList = data
      .filter((doctor) => {
        const user = data.find((user) => user.id === doctor.id)

        if (user) {
          const matchesQuery =
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            doctor.place?.toLowerCase().includes(query.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(query.toLowerCase())

          return matchesQuery
        }
        return false
      })
      .map((doctor) => {
        const user = data.find((user) => user.id === doctor.id)

        if (user) {
          return {
            id: user.id,
            name: user.name,
            speciality: doctor.specialization,
            place: 'Consultorio Principal',
            address: doctor.email || 'Dirección no disponible',
          }
        }
      })
      .filter(Boolean)

    const uniqueDoctorList = Array.from(
      new Map(
        doctorList.map((item) => [`${item?.speciality}-${item?.place}`, item])
      ).values()
    )

    return uniqueDoctorList
  }

  const results = getDoctorData(data)
  console.log(results);

  const isNameSearch = results.some(result => result?.name.toLowerCase().includes(query.toLowerCase()))
  const isSpecialitySearch = results.some(result => result?.speciality.toLowerCase().includes(query.toLowerCase()))
  const isPlaceSearch = results.some(result => result?.place.toLowerCase().includes(query.toLowerCase()))

  let filteredResults = results

  if (isSpecialitySearch) {
    filteredResults = Array.from(
      new Map(
        filteredResults.map(item => [item?.speciality, item])
      ).values()
    )
  }

  if (isPlaceSearch) {
    filteredResults = Array.from(
      new Map(
        filteredResults.map(item => [item?.place, item])
      ).values()
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {query && (
        <span className='py-9 text-xl font-medium'>Resultados para {query}</span>
      )}
      <div className='flex'>

        {filteredResults.length > 0 && query && (
          <>
            <div className='flex flex-wrap gap-4 h-min w-full max-w-6xl'>
              {filteredResults.map((doctor) => (
                <div className="flex h-min flex-grow flex-wrap gap-4" key={doctor?.id}>
                  {isNameSearch && (
                    <DoctorCard id={doctor?.id} name={doctor?.name} img="" place={doctor?.place} speciality={doctor?.speciality} />
                  )}
                  {isSpecialitySearch && (
                    <SpecialityCard img="" name={doctor?.speciality} />
                  )}
                  {isPlaceSearch && (
                    <PlaceCard details address={doctor?.address} img="" name={doctor?.place} />
                  )}
                </div>
              ))}
            </div>
            <Placeholder />
          </>
        )}
        {results.length === 0 && query && (
          <span>No se encontraron resultados</span>
        )}
      </div>

    </div>
  )
}
