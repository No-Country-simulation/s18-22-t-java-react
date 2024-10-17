import { DoctorFromResponse } from "@/interfaces/user"
import { SpecialityCard, PlaceCard } from "../index"

interface Props {
  list: DoctorFromResponse[]
  title: string
}

export function DoctorList({ list, title }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {list.map((doctor) => (
          <>
            {title === 'speciality' ? (
              <SpecialityCard key={doctor.id} name={doctor.specialization} img="" />
            ) : (
              <PlaceCard details={false} key={doctor.id} name={doctor.place || 'Consultorio Principal'} img="" address="Jujuy 2176" />
            )}
          </>
        ))}
      </div>
    </div>
  )
}