import { Check } from "lucide-react";
import Link from "next/link";

export default function CanceledAppointmentPage({ params }: { params: { id: string } }) {

  console.log(params)

  return (
    <div className="h-[calc(100vh-112px)] w-[1524px] flex justify-center items-center pb-10">

      <div className="max-w-[650px] px-4 text-center justify-items-center">
        <div className="bg-blue-500 size-10 rounded-full flex justify-center items-center mx-auto mb-10">
          <Check className="text-white" size={30} />
        </div>

        <h1 className="text-5xl font-medium">El turno ha sido anulado</h1>
        <p className="my-4 text-2xl text-[#5C5C5C]">El turno asignado para [Fecha de cita] a las [Hora de la cita] con [Nombre del doctor] en [Establecimiento]</p>

        <Link href={"/doctor/appointment"} className="block mt-14 w-[274px] h-16 rounded-xl border border-blue-500 bg-blue-500 text-white text-lg content-center">Volver al inicio</Link>
      </div>
    </div>
  );
}