import Link from "next/link"
import Image from "next/image"
import specialtyImg from '/public/images/specialty.svg'

interface Props {
  name?: string,
  img: string
}
export function SpecialityCard({ name, img }: Props) {
  return (
    <Link href={`/specialty/${name}`} className="h-[184px] w-[275px]flex flex-col border-2 border-[#D9D9D9] rounded-[6px]">
      <>
        {img !== '' ? (
          <Image src={img} height={120} width={275} alt={name + "image"} />
        ) : (
          <Image src={specialtyImg} height={120} width={275} alt={"specialty image"} className="rounded-t" />
        )}
      </>
      <div className="flex items-center h-[66px] px-3">
        <span className="text-xl">{name}</span>
      </div>
    </Link>
  )
}