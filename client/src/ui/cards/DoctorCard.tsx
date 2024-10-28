"use client"

import { useRouter } from "next/navigation"
import { AlertMessage } from "@/components"
import { es } from 'date-fns/locale';
import { format } from "date-fns";
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Props {
  dashboard?: boolean,
  specialty?: string,
  startTime: string
  id_doctor: number,
  place?: string,
  name: string,
  date: string,
  img: string,
}
export function DoctorCard({ id_doctor, name, specialty, place = "Clínica Colón", img, dashboard, date, startTime }: Props) {

  const [openDialog, setOpenDialog] = useState(false)
  const [messageAlert, setMessageAlert] = useState({ title: "", description: <p></p>, confirm: "Confirmar", cancel: "Cancelar" })
  const formattedDate = format(date ?? new Date(), "EEEE d 'de' MMMM", { locale: es });

  const isValidSrc = img && (img.startsWith('/') || img.startsWith('http'));

  const route = useRouter()

  const cancelAlert = () => {
    const alert = {
      title: "¿Querés cancelar la cita?",
      description: <p>Querrías cancelra tu cita asignada para el <span className="font-bold">{formattedDate}</span> a las <span className="font-bold">{startTime.replace(":00", "")}</span> en <span className="font-bold">Clínica Pueyrredón</span>?</p>,
      confirm: "Cancelar cita",
      cancel: "Mantener cita"
    }
    setMessageAlert(alert)
    setOpenDialog(true)
  }

  const changeAppointment = () => {
    const alert = {
      title: "¿Queréis reprogramar la cita?",
      description: <p>Tenés cita asignada el <span className="font-bold">{formattedDate}</span> a las <span className="font-bold">{startTime}</span> en <span className="font-bold">Clínica Pueyrredón</span>. Si reprogramás, tu cita actual será cancelada.</p>,
      confirm: "Reprogramar cita",
      cancel: "Mantener cita"
    }
    setMessageAlert(alert)
    setOpenDialog(true)
  }

  const updateAppointment = () => {
    if (messageAlert.confirm === "Reprogramar cita") {
      route.push(`/appointment/calendar/${id_doctor}`)
    }
  }

  return (
    <>
      <div className="w-[854px] h-[168px] rounded-xl flex items-center gap-4 pl-4 py-4 shadow-4xl">

        {/* IMAGE  */}
        {img !== '' ? (
          <figure className="relative rounded-full size-[88px] overflow-hidden">
            {
              isValidSrc ? (
                <Image
                  src={img}
                  fill
                  sizes="(max-width: 768px) 100px" alt={name + "image"}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={"https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png"}
                  fill
                  sizes="(max-width: 768px) 100px" alt={name + "image"}
                  className="object-cover"
                />
              )
            }

          </figure>
        ) : (
          <div className="size-[88px] bg-gray-300 rounded-full" />
        )}

        <div className="flex flex-col justify-center h-[89px] px-3">
          <span className="font-medium text-[22px] text-[#0C0C0E]">{name}</span>
          <span className="font-medium -mt-1 mb-2 text-lg text-[#505256]">{specialty}</span>
          {dashboard && (
            <span className=" text-[#3C4C51]">{date?.replace(/-/g, "/")}</span>
          )}
          <span className="mb-2 text-[#3C4C51]">{place}</span>
          {!dashboard && (
            <span className="text-sm bg-yellow-200 rounded px-2">Proximo turno disponible: 20/10 - 14:00hs</span>
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

    </>
  )
}

