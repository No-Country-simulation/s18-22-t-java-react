'use client'

import { AppointmentFromResponse, AppointmentWithDoctor } from "@/interfaces/appointment"
import { PatientFromResponse } from "@/interfaces/user"
import { ButtonComponent } from "../buttons/ButtonComponent"
import { BackButton, DialogComponent } from "@/components"
import { useState } from "react"
import { cancelAppointment } from "@/actions/appointment-action"
import ImageValidate from "@/components/ImageValidate"

interface Props {
  appointment: AppointmentFromResponse,
  patient: PatientFromResponse,
  lastAppointments: AppointmentWithDoctor[]
}
export function AppointmentDetails({ appointment, patient, lastAppointments }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [year, month, day] = appointment.date.split("-")
  const formattedDate = `${day}/${month}`
  const fullFormattedDate = `${day}/${month}/${year}`

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await cancelAppointment(appointment.id as number)
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
  return (
    <>
      <BackButton />
      <div className="w-[1524px] pt-20">
        <div className="flex p-10 rounded-xl items-center shadow-2xl">
          <div>
            <h3 className="text-[32px] font-medium">Turno {formattedDate} {appointment.startTime}hs.</h3>
            <span className="text-2xl font-medium">Clinica Colon</span>
          </div>
          <ButtonComponent size={'large'} variant={'main'} text={'Anular Turno'} className="ms-auto" onClick={() => setOpenDialog(true)} />
        </div>
        <div className="flex px-10">
          <div>
            <div className="flex gap-7 my-14 ms-3">
              <ImageValidate src={patient.img} alt={patient.name} />
              <span className="content-center text-[22px] font-medium text-wrap w-3">{patient.name}</span>
            </div>
            <div className="flex flex-col gap-[42px]">
              <h4 className="font-medium text-[22px]">Datos del paciente</h4>
              <div className="flex flex-col text-xl">
                <span className="mb-3"><span className="font-medium">Dni:</span> {patient.dni}</span>
                <span><span className="font-medium">Telefono:</span> {patient.phone}</span>
                <span><span className="font-medium">Email:</span> {patient.email}</span>
              </div>

              <div className="flex flex-col text-xl">
                <span><span className="font-medium">Obra Social:</span> {patient.social_work}</span>
                <span><span className="font-medium">Numero de asociado:</span>  {patient.number_associate}</span>
              </div>

              <ButtonComponent size={'large'} variant={'mainLight'} text={'Historial clinico'} className="font-medium mt-4 border-blue-500 text-blue-500" />
            </div>
          </div>
          <div className="ms-auto w-[420px] mt-[212px]">
            <h4 className="font-medium text-[22px] mb-11">Ultimas atenciones del paciente</h4>
            <div className="flex flex-col gap-5">
              {lastAppointments.map((appointment) => (
                <div className="shadow-2xl border-b rounded-xl flex flex-col p-5" key={appointment.id}>
                  <span className="font-medium text-[22px]">{appointment.doctor.name}</span>
                  <span className="text-[#505256] font-medium mb-3">{appointment.doctor.specialization}</span>
                  <span>{appointment.status} el dia {appointment.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DialogComponent
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="¿Desea Anular el Turno?"
        cancelText="Cancelar"
        confirmText="Confirmar"
        description={"¿Desea anular el turno con " + lastAppointments[0].doctor.name + ' el dia ' + fullFormattedDate + ' a las ' + appointment.startTime + 'hs?'}
        onConfirm={handleDelete}
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