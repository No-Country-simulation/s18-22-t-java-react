import Link from "next/link"
import Image from "next/image"

interface Props {
  name?: string,
  img: string
}
export function SpecialityCard({ name, img }: Props) {
  return (
    <Link href={`/specialty/${name}`} className="flex flex-col border  rounded">
      <>
        {img !== '' ? (
          <Image src={img} height={120} width={275} alt={name + "image"} />
        ) : (
          <div className="h-[120px] w-[275px] bg-gray-300" />
        )}
      </>
      <div className="flex items-center h-[66px] px-3">
        <span className="text-xl">{name}</span>
      </div>
    </Link>
  )
}