import { Doctor } from "@/interfaces/user"
import { SpecialityCard, PlaceCard } from "../index"

interface Props {
  list: Doctor[]
  title: string
}

export function DoctorList({ list, title }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {list.map((doctor) => (
          <>
            {title === 'speciality' ? (
              <SpecialityCard key={doctor.id} name={doctor.speciality} img="" />
            ) : (
              <PlaceCard key={doctor.id} name={doctor.place} img="" address="Calle falsa 123" />
            )}
          </>
        ))}
      </div>
    </div>
  )
}