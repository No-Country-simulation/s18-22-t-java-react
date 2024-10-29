import { getAppointmentById } from "@/actions/appointment-action";
import { Check } from "lucide-react";
import Link from "next/link";
import { cookies } from 'next/headers';
import { sendMail } from "@/actions/email/emailActions";

export default async function CanceledAppointmentPage({ params }: { params: { id: string } }) {
  const userCookie = cookies().get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : {};

  const appointmentId = params.id

  const appointment = await getAppointmentById(appointmentId)
  const message = `Tu turno ha sido reservado para el ${appointment.date} a las ${appointment.starTime}hs con el doctor/a ${appointment.doctorName} en la Clinica Colon`
  const notification = await sendMail(user.email, 'Cita confirmada', message)

  return (
    <div className="h-[calc(100vh-112px)] w-[1524px] flex justify-center items-center pb-10">

      <div className="max-w-[650px] px-4 text-center justify-items-center">
        <div className="bg-blue-500 size-10 rounded-full flex justify-center items-center mx-auto mb-10">
          <Check className="text-white" size={30} />
        </div>

        <h1 className="text-5xl font-medium">Tu cita ha sido cancelada</h1>
        <p className="my-4 text-2xl text-[#5C5C5C]">El turno asignado para {appointment.date} a las {appointment.starTime} con {appointment.doctorName} en Clinica Colón ha sido cancelada.</p>

        {notification === 'Email sent successfully' && (
          <p className="text-emerald-500">Se ha enviado un email con la confirmación de tu turno a: <strong>{user.email}</strong></p>
        )}

        <Link href={user && user.specialization ? "/doctor/calendar" : '/dashboard'} className="block mt-14 w-[274px] h-16 rounded-xl border border-blue-500 bg-blue-500 text-white text-lg content-center">Volver al inicio</Link>
      </div>
    </div>
  );
}