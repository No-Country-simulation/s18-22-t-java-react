import Link from "next/link"
import data from '../../utils/data.json'
import { Data } from "@/interfaces/user"

type Props = {
  query: string
  speciality?: string
  place?: string
}

export const SearchResults: React.FC<Props> = async ({ query, speciality = '', place = '' }) => {
  const getDoctorData = (data: Data) => {
    const doctorList = data.doctors
      .filter((doctor) => {
        const matchesSpeciality = speciality ? doctor.speciality.toLowerCase() === speciality.toLowerCase() : true

        const matchesPlace = place ? doctor.place.toLowerCase() === place.toLowerCase() : true

        return matchesSpeciality && matchesPlace
      })
      .map((doctor) => {
        const user = data.users.find((user) =>
          user.id === doctor.id_user && user.name.toLowerCase().includes(query.toLowerCase())
        )

        if (user) {
          return {
            id: user.id,
            name: user.name,
            speciality: doctor.speciality
          }
        }
      })
      .filter(Boolean)

    return doctorList
  }

  const results = getDoctorData(data)

  return (
    <div className="flex flex-col gap-2">
      {results.length > 0 ? (
        <>
          {results.map((doctor) => (
            <div className="flex justify-between border border-black rounded p-4" key={doctor?.id}>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">{doctor?.name}</span>
                <span>{doctor?.speciality}</span>
              </div>
              <Link href={`/appointment/${doctor?.id}`} className="p-4 border bg-blue-500 rounded text-white">
                Ver Más
              </Link>
            </div>
          ))}
        </>
      ) : (
        <span className="mx-4">No se encontraron resultados</span>
      )}
    </div>
  )
}
