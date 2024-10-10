import { Doctor } from "@/interfaces/user"
import Link from "next/link"

interface Props {
  list: Doctor[]
  title: string
}

export function DoctorList({ list, title }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {list.map((doctor) => (
          <div className="flex flex-col gap-4 border border-black rounded p-2" key={doctor.id}>
            <span>{title === 'speciality' ? doctor.speciality : doctor.place}</span>
            <Link href={`/search?${title === 'speciality' ? 'speciality=' + doctor.speciality : 'place=' + doctor.place}`} className="px-4 py-2 border bg-blue-500 rounded text-white">Ver Más</Link>
          </div>
        ))}
      </div>
    </div>
  )
}