import Image from "next/image"
import Link from "next/link"

interface Props {
  id?: number,
  name?: string,
  speciality?: string,
  place?: string,
  img: string
}
export function DoctorCard({ id, name, speciality, place, img }: Props) {
  return (
    <div className="min-w-full flex gap-4 border-b border-b-black pl-4 pb-4">
      <>
        {img !== '' ? (
          <Image src={img} height={120} width={275} alt={name + "image"} />
        ) : (
          <div className="size-[88px] bg-gray-300 rounded-full" />
        )}
      </>
      <div className="flex flex-col justify-center h-[89px] px-3">
        <span className="text-xl">{name}</span>
        <span className="font-semibold -mt-1">{speciality}</span>
        <span>{place}</span>
        <span>Proximo turno disponible: 20/10 - 14:00hs</span>
      </div>
      <div className="flex justify-center items-center ml-auto">
        <Link href={'/appointment/' + id} className="bg-gray-300 rounded px-12 py-3">Ver Agenda</Link>
      </div>
    </div>
  )
}