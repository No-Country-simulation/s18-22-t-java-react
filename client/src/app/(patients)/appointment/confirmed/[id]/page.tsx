import { getAppointmentById } from "@/actions/appointment-action";
import { sendMail } from "@/actions/email/emailActions";
import { Check } from "lucide-react";
import Link from "next/link";
import { cookies } from 'next/headers';
import { AppointmentWithDoctor } from "@/interfaces/appointment";

export default async function ConfirmedPage({ params }: { params: { id: string } }) {

    const userCookie = cookies().get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : {};
    const appointment: AppointmentWithDoctor = await getAppointmentById(params.id)
    const message = `Tu turno ha sido reservado para el ${appointment.date} a las ${appointment.startTime}hs con el doctor/a ${appointment.doctor.name} en la Clinica Colon`
    const notification = await sendMail(user.email, 'Cita confirmada', message)
    return (
        <div className="h-[calc(100vh-112px)] flex justify-center items-center pb-10">

            <div className="max-w-[550px] px-4 text-center">
                <div className="bg-blue-500 size-10 rounded-full flex justify-center items-center mx-auto mb-10">
                    <Check className="text-white" size={30} />
                </div>

                <h1 className="text-4xl font-bold">Tu turno ha sido reservado</h1>
                <p className="my-4">Para la fecha de <span className="font-bold">{appointment.date}</span> a la <span className="font-bold">{appointment.startTime}</span> con el doctor <span className="font-bold">{appointment.doctor.name}</span> en la <span className="font-bold">Clínica colón</span></p>

                {notification === 'Email sent successfully' && (
                    <p className="text-emerald-500">Se ha enviado un email con la confirmación de tu turno a: <strong>{user.email}</strong></p>
                )}
                <div className="grid grid-cols-2 gap-4 mt-16">
                    <button className="border-2 text-blue-500 font-semibold border-blue-500 py-4 rounded-xl">Descargar comprobante</button>
                    <Link href={"/dashboard"} className="bg-blue-500 text-white py-4 rounded-xl">Volver al inicio</Link>
                </div>
            </div>
        </div>
    );
}