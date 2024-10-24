import { getAppointmentById } from "@/actions/appointment-action";
import { Check } from "lucide-react";
import Link from "next/link";

export default async function ConfirmedPage({ params }: { params: { id: string } }) {

    const appointment = await getAppointmentById(params.id)

    return (
        <div className="h-[calc(100vh-112px)] flex justify-center items-center pb-10">

            <div className="max-w-[550px] px-4 text-center">
                <div className="bg-blue-500 size-10 rounded-full flex justify-center items-center mx-auto mb-10">
                    <Check className="text-white" size={30} />
                </div>

                <h1 className="text-4xl font-bold">Tu turno ha sido reservado</h1>
                <p className="my-4">Para el día <span className="font-bold">{appointment.date}</span> a la <span className="font-bold">{appointment.starTime}</span> con el doctor <span className="font-bold">{appointment.doctorName}</span> en la <span className="font-bold">Clínica colón</span></p>

                <div className="grid grid-cols-2 gap-4 mt-16">
                    <button className="border-2 text-blue-500 font-semibold border-blue-500 py-4 rounded-xl">Descargar comprobante</button>
                    <Link href={"/dashboard"} className="bg-blue-500 text-white py-4 rounded-xl">Volver al inicio</Link>
                </div>
            </div>
        </div>
    );
}