import { DoctorFromResponse } from "@/interfaces/user"
import { SpecialityCard, PlaceCard } from "../index"
import { Clinic } from "@/interfaces/clinic"

interface Props {
  list: DoctorFromResponse[] | Clinic[]
  title: string
}

export function DoctorList({ list, title }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {list.map((doctor) => (
          <div key={doctor.id}>
            {title === 'speciality' && 'specialization' in doctor ? (
              <SpecialityCard name={doctor.specialization} img="" />
            ) : (
              'address' in doctor && (
                <PlaceCard id={doctor.id} details={false} name={doctor.name} img={doctor.vlinicImage} address={doctor.address} />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}