import { Clinic } from '@/interfaces/clinic'
import { DoctorFromResponse } from '@/interfaces/user'
import { DoctorCard, PlaceCard, SpecialityCard } from "@/ui"

type Props = {
  query: string
  data: DoctorFromResponse[]
  clinicList: Clinic[]
}

export const SearchResults: React.FC<Props> = ({ query, data, clinicList }) => {
  const getDoctorData = (data: DoctorFromResponse[], clinics: Clinic[]) => {
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
            img: doctor.img,
            place: clinics[0]?.name,
            address: clinics[0]?.address,
          }
        }
      })
      .filter(Boolean)

    const clinicList = clinics
      .filter((clinic) => {
        const matchesQuery =
          clinic.name.toLowerCase().includes(query.toLowerCase()) ||
          clinic.address.toLowerCase().includes(query.toLowerCase())

        return matchesQuery
      })
      .map((clinic) => ({
        id: clinic.id,
        name: '',
        speciality: '',
        img: clinic.vlinicImage,
        place: clinic.name,
        address: clinic.address,
      }))

    const combinedList = [...doctorList, ...clinicList]

    const uniqueCombinedList = Array.from(
      new Map(
        combinedList.map((item) => [`${item?.speciality}-${item?.place}`, item])
      ).values()
    )

    return uniqueCombinedList
  }

  const results = getDoctorData([...data, {
    id: 0,
    password: "",
    email: "",
    phone: "",
    active: true,
    specialization: "",
    licenseNumber: "",
    img: "",
    place: "Clinica Colon - Jujuy 2176",
    name: "",
  }], clinicList)

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
        <span className='py-9 text-xl font-medium'>Resultados para &quot;{query}&quot;</span>
      )}
      <div className='flex'>

        {filteredResults.length > 0 && query && (
          <>
            <div className='flex flex-wrap gap-4 h-min w-full max-w-6xl'>
              {filteredResults.map((result) => (
                <div className="flex h-min flex-grow flex-wrap gap-4" key={result?.id}>
                  {isNameSearch && result?.name && (
                    <DoctorCard id_doctor={result?.id} name={result?.name} img={result?.img} place={result?.place} specialty={result?.speciality} />
                  )}
                  {isSpecialitySearch && result?.speciality && (
                    <SpecialityCard img="" name={result?.speciality} />
                  )}
                  {isPlaceSearch && result?.place && !result?.name && (
                    <PlaceCard details address={result?.address} img="" name={result?.place} />
                  )}
                </div>
              ))}
            </div>
            {/* <Placeholder /> */}
          </>
        )}
        {results.length === 0 && query && (
          <span>No se encontraron resultados</span>
        )}
      </div>

    </div>
  )
}
