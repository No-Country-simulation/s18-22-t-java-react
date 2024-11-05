import { IconPlaceMarker } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"
import clinicImg from '/public/images/clinic.png'

interface Props {
  name?: string,
  address?: string,
  img: string
  details: boolean
  id?: number
}
export function PlaceCard({ id, name, address, img, details }: Props) {
  return (
    <>
      {details ? (
        <Link href={`/clinic/${id}`} className="flex border-2 border-[#D9D9D9] rounded-xl overflow-hidden w-[711px] h-[176px]">
          <>
            {img !== '' ? (
              <Image src={img} height={120} width={275} alt={name + "image"} />
            ) : (
              <Image className="" src={clinicImg} height={176} width={275} alt={"clinica imagen"} />
            )}
          </>
          <div className="flex flex-col justify-center py-7 ps-4">
            <span className="text-2xl font-medium">{name}</span>
            <span className="text-lg flex gap-2"><IconPlaceMarker /> {address}</span>
            <span className="mt-12">Traumatología - Dermatología - Pedriatía.</span>
          </div>
        </Link>
      ) : (
        <Link href={`/clinic/${id}`} className="flex flex-col border-2 border-[#D9D9D9] rounded-[6px]">
          <>
            {img !== '' ? (
              <Image src={img} height={120} width={275} alt={name + "image"} />
            ) : (
              <Image src={clinicImg} height={120} width={275} alt={"clinica imagen"} className="rounded-t" />
            )}
          </>
          <div className="flex flex-col justify-center h-[89px] px-3">
            <span className="text-xl">{name}</span>
            <span>{address}</span>
          </div>
        </Link>
      )}
    </>
  )
}