import { DoctorForList } from "@/interfaces/user"
import Link from "next/link"

interface Props {
  list: DoctorForList[]
}

export function DoctorList({ list }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {list.map((doctor) => (
        <div className="flex justify-between border border-black rounded p-4" key={doctor.id}>
          <div className="flex flex-col">
            <span className="text-2xl font-semibold">{doctor.name}</span>
            <span>{doctor.speciality}</span>
          </div>
          <Link href={`/appointment/${doctor.id}`} className="p-4 border bg-blue-500 rounded text-white">Ver Agenda</Link>
        </div>
      ))}
    </div>
  )
}