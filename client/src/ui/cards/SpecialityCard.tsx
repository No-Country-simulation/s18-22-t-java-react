import Link from "next/link";
import Image from "next/image"
import specialtyImg from '/public/images/specialty.svg'
import { IconCardiology, IconNeurology, IconPediatrics, IconSurgery, IconTraumatology } from "@/components/icons";

interface Props {
  name?: string;
  img: string;
}

const iconMap: { [key: string]: JSX.Element } = {
  Cardiologia: <IconCardiology color="#004784" />,
  Cirugia: <IconNeurology color="#004784" />,
  Pediatria: <IconPediatrics color="#004784" />,
  Pediatra: <IconPediatrics color="#004784" />,
  Neurologia: <IconSurgery color="#004784" />,
  Traumatologia: <IconTraumatology color="#004784" />,
  Cardiología: <IconCardiology color="#004784" />,
  Cirugía: <IconNeurology color="#004784" />,
  Pediatría: <IconPediatrics color="#004784" />,
  Pediátra: <IconPediatrics color="#004784" />,
  Neurología: <IconSurgery color="#004784" />,
  Traumatología: <IconTraumatology color="#004784" />,
};

export function SpecialityCard({ name, img }: Props) {
  const iconSrc = name && iconMap[name] ? iconMap[name] : specialtyImg;

  return (
    <Link href={`/specialty/${name}`} className="min-h-[184px] h-[184px] min-w-[275px] w-[275px] flex flex-col rounded-[6px]">
      <>
        {typeof iconSrc === 'string' ? (
          <Image src={img !== '' ? img : iconSrc} height={120} width={275} alt={name + " image"} className="rounded-t" />
        ) : (
          <div className="flex justify-center items-center h-[120px] w-[275px] bg-blue-50 rounded-t">
            {iconSrc}
          </div>
        )}
      </>
      <div className="flex items-center h-[66px] px-3 border-b-2 border-x-2 border-[#D9D9D9]">
        <span className="text-xl">{name}</span>
      </div>
    </Link>
  );
}