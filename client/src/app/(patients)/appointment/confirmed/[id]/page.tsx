import { Check } from "lucide-react";
import Link from "next/link";

export default function ConfirmedPage({ params }: { params: { name: string } }) {

    return (
        <div className="h-[calc(100vh-112px)] flex justify-center items-center pb-10">

            <div className="max-w-[550px] px-4 text-center">
                <div className="bg-black size-10 rounded-full flex justify-center items-center mx-auto mb-10">
                    <Check className="text-white" size={30} />
                </div>

                <h1 className="text-4xl font-bold">Tu turno ha sido reservado</h1>
                <p className="my-4">Para el día [Fecha de cita] a la [Hora de la cita]  con [Nombre del doctor] en [Establecimiento]</p>

                <div className="grid grid-cols-2 gap-4 mt-16">
                    <button className="border border-[#D9D9D9] py-2 rounded-lg">Descargar comprobante</button>
                    <Link href={"/dashboard"} className="bg-[#D9D9D9] py-2">Volver al inicio</Link>
                </div>
            </div>
        </div>
    );
}