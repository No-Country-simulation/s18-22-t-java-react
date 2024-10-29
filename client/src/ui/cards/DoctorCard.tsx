"use client"

import { cancelAppointment } from "@/actions/appointment-action"
import { DialogComponent } from "@/components"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Props {
  id?: number,
  name?: string,
  speciality?: string,
  place?: string,
  img?: string,
  dashboard?: boolean
  date?: string
  startTime?: string
}

export function DoctorCard({ id, name, speciality, place = "Clínica Colón", img, dashboard, date, startTime }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState({
    title: "",
    description: "",
    cancelText: "Cancelar",
    confirmText: "Confirmar",
    onConfirm: () => { }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formattedDate = date ? (() => {
    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`
  })() : '04/11/2024'

  const cancelAlert = async () => {
    setError(null)
    const alert = {
      title: "¿Querés cancelar la cita?",
      description: `Querrías cancelar tu cita asignada para el ${formattedDate} a las ${startTime} en ${place}. Si reprogramás, tu cita actual será cancelada.`,
      cancelText: "Mantener cita",
      confirmText: "Cancelar cita",
      onConfirm: async () => {
        setLoading(true)
        try {
          const response = await cancelAppointment(id as number)
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

    setDialogProps(alert)
    setOpenDialog(true)
  }

  const changeAppointment = () => {
    setError(null)
    const alert = {
      title: "¿Queréis reprogramar la cita?",
      description: `Tenés cita asignada el ${formattedDate} a las ${startTime} en ${place}. Si reprogramás, tu cita actual será cancelada.`,
      cancelText: "Mantener cita",
      confirmText: "Reprogramar cita",
      onConfirm: () => {
        // Add your reprogram logic here
        setOpenDialog(false)
      }
    }
    setDialogProps(alert)
    setOpenDialog(true)
  }

  return (
    <>
      <div className="w-[854px] h-[168px] rounded-xl flex items-center gap-4 pl-4 py-4 shadow-2xl">

        {/* IMAGE  */}
        {img && img !== 'string' && img !== '' ? (
          <figure className="relative rounded-full size-[88px] overflow-hidden">
            <Image
              src={img}
              fill
              sizes="(max-width: 768px) 100px"
              alt={name + "image"} className="object-cover"
            />
          </figure>
        ) : (
          <figure className="relative rounded-full size-[88px] overflow-hidden">
            <Image
              src={"https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png"}
              fill
              sizes="(max-width: 768px) 100px"
              alt={name + "image"} className="object-cover"
            />
          </figure>
        )}

        <div className="flex flex-col justify-center h-[89px] px-3">
          <span className="font-medium text-[22px] text-[#0C0C0E]">{name}</span>
          <span className="font-medium -mt-1 mb-2 text-lg text-[#505256]">{speciality}</span>
          {dashboard && (
            <span className=" text-[#3C4C51]">{formattedDate}</span>
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
            <Link href={'/appointment/calendar/' + id} className="w-[274px] h-16 bg-blue-500 text-white rounded-xl text-lg font-medium text-center content-center">Ver Agenda</Link>
          </div>
        )}
      </div>
      <DialogComponent
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={dialogProps.title}
        description={dialogProps.description}
        cancelText={dialogProps.cancelText}
        confirmText={dialogProps.confirmText}
        onConfirm={dialogProps.onConfirm}
      />
      {loading && <div className="loading-indicator">Cargando...</div>}
      {error && (
        <p className="bg-blue-500 text-white p-4 absolute top-28 right-24 w-64 rounded-xl rounded-tr-none">
          {error}
        </p>
      )}
    </>
  )
}
