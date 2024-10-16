import { IconPlaceMarker } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"

interface Props {
  name?: string,
  address?: string,
  img: string
  details: boolean
}
export function PlaceCard({ name, address, img, details }: Props) {
  return (
    <>
      {details ? (
        <Link href={`/appointment?q=${name}`} className="flex border rounded items-center">
          <>
            {img !== '' ? (
              <Image src={img} height={120} width={275} alt={name + "image"} />
            ) : (
              <div className="h-[176px] w-[275px] bg-gray-300" />
            )}
          </>
          <div className="flex flex-col justify-center h-[89px] px-3">
            <span className="text-xl">{name}</span>
            <span className="flex gap-2"><IconPlaceMarker /> {address}</span>
            <span className="mt-12">Medicina General - Traumatologi - Dermatologia...</span>
          </div>
        </Link>
      ) : (
        <Link href={`/appointment?q=${name}`} className="flex flex-col border rounded">
          <>
            {img !== '' ? (
              <Image src={img} height={120} width={275} alt={name + "image"} />
            ) : (
              <div className="h-[120px] w-[275px] bg-gray-300" />
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