import { Check } from "lucide-react";
import Link from "next/link";

export default async function WaitListPage() {

  return (
    <div className="h-[calc(100vh-112px)] flex justify-center items-center pb-10">

      <div className="max-w-[550px] px-4 text-center flex flex-col gap-2">
        <div className="bg-blue-500 size-10 rounded-full flex justify-center items-center mx-auto mb-10">
          <Check className="text-white" size={30} />
        </div>

        <h1 className="text-4xl font-bold">Te hemos añadido a la lista de espera</h1>
        <p className="my-4">Te avisaremos tan pronto haya un espacio disponible</p>

        <div className="mt-2">
          <Link href={"/dashboard/appointments"} className="bg-blue-500 text-white p-4 rounded-xl">Volver a la agenda</Link>
        </div>
      </div>
    </div>
  );
}