
import Image from "next/image";
import Link from "next/link";
import HomeImage from '/public/images/home.png'
import { ButtonComponent } from "@/ui";

export default function Home() {
  return (
    <div>
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
          <p className="max-w-[555px] text-start text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dolor nulla, maximus sit amet nulla egestas, egestas maximus sapien. Aliquam eget libero id justo molestie ultricies. Fusce ac nisi dignissim, finibus libero  amet, congue orci. Fusce non gravida nunc. Praesent fermentum egestas eros, non imperdiet dolor. </p>
          <Link href={'/appointment'} className="mt-16 max-w-max">
            <ButtonComponent size="big" variant="dark" text="Reservá un turno" />
          </Link>
        </div>
      </div>
    </div >
  );
}
