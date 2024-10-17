import { SvgLocation, SvgPhone } from "@/components"
import imageClinic from "/public/image/clinic/clinic.png"
import { Select } from "@/ui";
import Image from "next/image";

export default function ClinicPage({ params }: { params: { name: string } }) {
    return (
        <div className="max-w-[1200px] mx-auto px-4">

            <div className="flex mt-14 gap-8 max-w-[824px] w-full">

                {/* IMAGE  */}
                <figure className="size-52 bg-[#D9D9D9] rounded-full shrink-0">
                    <Image src={imageClinic} alt="hospital" />
                </figure>

                <div>
                    <h2 className="text-4xl">Clínica Colón</h2>
                    <div className="flex gap-1 my-4">
                        <SvgLocation /> <span className="mr-5">Jujuy 2176</span> <SvgPhone /> <span>0223 499-2656</span>
                    </div>

                    <p>
                        Clínica Colón se destaca por su atención médica de calidad y un equipo multidisciplinario de profesionales dedicados a brindar soluciones integrales para tu salud. Ofrecemos una amplia gama de especialidades médicas y servicios personalizados, garantizando el bienestar de nuestros pacientes en cada etapa de su vida.
                    </p>
                </div>
            </div>

            <Select />
        </div>
    );
}