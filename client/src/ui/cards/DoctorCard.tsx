"use client"

import { cancelAppointment } from "@/actions/appointment-action"
import ImageValidate from "@/components/ImageValidate";
import { useRouter } from "next/navigation"
import { AlertMessage } from "@/components"
import { es } from 'date-fns/locale';
import { format } from "date-fns";
import { useState } from "react"
import Link from "next/link"

interface Props {
  id_appointment?: number
  dashboard?: boolean,
  specialty?: string,
  startTime?: string
  id_doctor?: number,
  place?: string,
  img?: string,
  date?: string
  name: string,
  id?: number
}
export function DoctorCard({ id_appointment, id_doctor, name, specialty, place = "Clínica Colón", img, dashboard, date, startTime }: Props) {

  const [messageAlert, setMessageAlert] = useState({ title: "", description: <p></p>, confirm: "Confirmar", cancel: "Cancelar" })
  const adjustedDate = new Date(date ?? new Date());
  adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
  const formattedDate = format(adjustedDate, "EEEE d 'de' MMMM", { locale: es });

  const route = useRouter()

  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cancelAlert = async () => {
    setError(null)
    const alert = {
      title: "¿Querés cancelar la cita?",
      description: <p>Querrías cancelar tu cita asignada para el <span className="font-bold">{formattedDate}</span> a las <span className="font-bold">{startTime?.slice(0, -3)}</span> en <span className="font-bold">{place}</span>.</p>,
      cancel: "Mantener cita",
      confirm: "Cancelar cita",
    }
    setMessageAlert(alert)
    setOpenDialog(true)
  }

  const changeAppointment = () => {
    setError(null)
    const alert = {
      title: "¿Queréis reprogramar la cita?",
      description: <p>Tenés cita asignada el <span className="font-bold">{formattedDate}</span> a las <span className="font-bold">{startTime?.slice(0, -3)}</span> en <span className="font-bold">{place}</span>. Si reprogramás, tu cita actual será cancelada.</p>,
      confirm: "Reprogramar cita",
      cancel: "Mantener cita"
    }
    setMessageAlert(alert)
    setOpenDialog(true)
  }

  const updateAppointment = async () => {
    console.log('id_doctor', id_doctor);
    if (messageAlert.confirm === "Reprogramar cita") {
      const pathname = `/appointment/calendar/${id_doctor}`;
      const query = { reschedule: 'true', appointmentId: String(id_appointment) };
      const url = `${pathname}?${new URLSearchParams(query).toString()}`;

      route.push(url);
    }

    if (messageAlert.confirm === "Cancelar cita") {
      try {
        const response = await cancelAppointment(id_appointment as number)
        if (response.error) {
          setError(response.error)
        }
      } catch (error) {
        console.log('error', error);
        setError("Error al cancelar la cita. Por favor, intente nuevamente.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className="w-[854px] h-[168px] rounded-xl flex items-center gap-4 pl-4 py-4 shadow-2xl">

        {/* IMAGE  */}

        <ImageValidate alt={name + "image"} src={img!} className="object-cover" />

        <div className="flex flex-col justify-center h-[89px] px-3">
          <span className="font-medium text-[22px] text-[#0C0C0E]">{name}</span>
          <span className="font-medium -mt-1 mb-2 text-lg text-[#505256]">{specialty}</span>
          {dashboard && (
            <span className=" text-[#3C4C51]">{date?.replace(/-/g, "/")} - {startTime?.slice(0, -3)}</span>
          )}
          <span className="mb-2 text-[#3C4C51]">{place}</span>
          {!dashboard && (
            <span className="text-sm bg-yellow-200 rounded px-2">Proximo turno disponible: 4/11 - 14:00hs</span>
          )}
        </div>
        {dashboard ? (
          <div className="flex justify-center items-center ml-auto mr-[50px] gap-6">
            <span
              onClick={cancelAlert}
              className="cursor-pointer w-40 h-16 bg-white border-2 border-blue-500 text-blue-500 rounded-xl text-lg font-medium text-center content-center">
              Cancelar
            </span>

            <span
              onClick={changeAppointment}
              className="cursor-pointer w-40 h-16 bg-blue-500 text-white rounded-xl text-lg font-medium text-center content-center">
              Reprogramar
            </span>
          </div>
        ) : (
          <div className="flex justify-center items-center ml-auto mr-[50px]">
            <Link href={'/appointment/calendar/' + id_doctor} className="w-[274px] h-16 bg-blue-500 text-white rounded-xl text-lg font-medium text-center content-center">Ver Agenda</Link>
          </div>
        )}
      </div>

      <AlertMessage
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        messageAlert={messageAlert}
        onConfirm={updateAppointment}
      />
      {loading && <div className="loading-indicator">Cargando...</div>}
      {error && (
        <div className="absolute top-28 right-24 w-64 rounded-xl px-4 py-6 shadow-2xl">
          <h4 className="font-semibold text-[22px] pb-4 border-b-2 border-[#B9B7B7]">Notificaciones</h4>
          <p className="pt-4">
            {error}
          </p>
        </div>
      )}
    </>
  )
}
