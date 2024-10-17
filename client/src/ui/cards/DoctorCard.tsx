import Image from "next/image"
import Link from "next/link"

interface Props {
  id?: number,
  name?: string,
  speciality?: string,
  place?: string,
  img?: string,
  dashboard?: boolean
}
export function DoctorCard({ id, name, speciality, place = "Clínica Colón", img, dashboard }: Props) {
  return (
    <div className="w-[854px] h-[168px] rounded-xl flex items-center gap-4 pl-4 py-4 shadow-4xl">

      {/* IMAGE  */}
      {img !== '' ? (
        <figure className="relative rounded-full size-[88px] overflow-hidden">
          <Image src={img || 'https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png'} fill sizes="(max-width: 768px) 100px" alt={name + "image"} className="object-cover" />
        </figure>
      ) : (
        <div className="size-[88px] bg-gray-300 rounded-full" />
      )}

      <div className="flex flex-col justify-center h-[89px] px-3">
        <span className="font-medium text-[22px] text-[#0C0C0E]">{name}</span>
        <span className="font-medium -mt-1 mb-2 text-lg text-[#505256]">{speciality}</span>
        {dashboard && (
          <span className=" text-[#3C4C51]">24/10/2024</span>
        )}
        <span className="mb-2 text-[#3C4C51]">{place}</span>
        {!dashboard && (
          <span className="text-sm bg-yellow-200 rounded px-2">Proximo turno disponible: 20/10 - 14:00hs</span>
        )}
      </div>
      {dashboard ? (
        <div className="flex justify-center items-center ml-auto mr-[50px] gap-6">
          <Link href={'/appointment/' + id} className="w-40 h-16 bg-white border-2 border-blue-500 text-blue-500 rounded-xl text-lg font-medium text-center content-center">Cancelar</Link>
          <Link href={'/appointment/' + id} className="w-40 h-16 bg-blue-500 text-white rounded-xl text-lg font-medium text-center content-center">Reprogramar</Link>
        </div>
      ) : (
        <div className="flex justify-center items-center ml-auto mr-[50px]">
          <Link href={'/appointment/' + id} className="w-[274px] h-16 bg-blue-500 text-white rounded-xl text-lg font-medium text-center content-center">Ver Agenda</Link>
        </div>
      )}
    </div>
  )
}