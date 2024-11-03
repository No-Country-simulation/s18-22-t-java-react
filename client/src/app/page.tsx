
import Image from "next/image";
import Link from "next/link";
import HomeImage from '/public/images/home.png'
import { ButtonComponent, Header } from "@/ui";

export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <div className="relative w-full overflow-hidden">
          <div className="flex transition-transform ease-out duration-500">
            <div className="min-w-full flex items-center justify-center">
              <Image
                src={HomeImage}
                width={1200}
                height={1200}
                alt="Policonsultorio 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 gaptext-center absolute left-[239px] top-[326px]">
          <h1 className="font-medium mb-4 text-[#004784] text-6xl text-start max-w-[868px]">Comenzá gestionar tus citas
            en un solo lugar.</h1>
          <p className="max-w-[380px] text-base text-start">Tu salud, nuestra prioridad. Simplifica la gestión de tus citas médicas con nuestra plataforma fácil de usar. Agenda, reprograma o cancela turnos en segundos y lleva el control de tus chequeos y resultados, todo en un solo lugar. </p>
          <Link href={'/appointment'} className="mt-16 max-w-max">
            <ButtonComponent size="big" variant="dark" text="Reservá un turno" />
          </Link>
        </div>
      </div>
    </div >
  );
}
