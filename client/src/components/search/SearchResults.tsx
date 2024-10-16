import data from '../../utils/data.json'
import { Data } from "@/interfaces/user"
import { DoctorCard, PlaceCard, SpecialityCard } from "@/ui"

type Props = {
  query: string
}

export const SearchResults: React.FC<Props> = async ({ query }) => {
  const getDoctorData = (data: Data) => {
    const doctorList = data.doctors
      .filter((doctor) => {
        const user = data.users.find((user) => user.id === doctor.id_user)

        if (user) {
          const matchesQuery =
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            doctor.place.toLowerCase().includes(query.toLowerCase()) ||
            doctor.speciality.toLowerCase().includes(query.toLowerCase())

          return matchesQuery
        }
        return false
      })
      .map((doctor) => {
        const user = data.users.find((user) => user.id === doctor.id_user)

        if (user) {
          return {
            id: user.id,
            name: user.name,
            speciality: doctor.speciality,
            place: doctor.place,
            address: doctor.address || "Dirección no disponible"

          }
        }
      })
      .filter(Boolean)

    const uniqueDoctorList = Array.from(
      new Map(
        doctorList.map(item => [`${item?.speciality}-${item?.place}`, item])
      ).values()
    )

    return uniqueDoctorList
  }

  const results = getDoctorData(data)

  const isNameSearch = results.some(result => result?.name.toLowerCase().includes(query.toLowerCase()))
  const isSpecialitySearch = results.some(result => result?.speciality.toLowerCase().includes(query.toLowerCase()))
  const isPlaceSearch = results.some(result => result?.place.toLowerCase().includes(query.toLowerCase()))

  let filteredResults = results;

  if (isSpecialitySearch) {
    filteredResults = Array.from(
      new Map(
        filteredResults.map(item => [item?.speciality, item])
      ).values()
    );
  }

  if (isPlaceSearch) {
    filteredResults = Array.from(
      new Map(
        filteredResults.map(item => [item?.place, item])
      ).values()
    );
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
                <div className="flex h-min flex-grow" key={doctor?.id}>
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
            <div className='w-[212px] h-[450px] bg-gray-300 ml-auto text-center content-center'>
              <p className='text-xl p-2'>Chat bot o Publicidad</p>
            </div>
          </>
        )}
        {results.length === 0 && query && (
          <span>No se encontraron resultados</span>
        )}
      </div>

    </div>
  )
}
