'use client'

import { DoctorFromResponse } from "@/interfaces/user"
import { Alert } from "../alert"

interface Props {
  doctor: DoctorFromResponse
}

export function DoctorDetails({ doctor }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-2xl font-bold">{doctor.name}</p>
        <p>Especialidad: {doctor.specialization}</p>
        <p>Teléfono: {doctor.phone}</p>
        <p>Email: {doctor.email}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3>Turnos Disponibles:</h3>
        <div className="bg-gray-500 animate-pulse h-80 rounded" />
        <h4>Seleccionar Fecha:</h4>
        <div className="bg-gray-500 animate-pulse h-10 rounded" />

        <Alert
          ClassName="bg-green-500 text-white"
          Type="Info"
          ButtonText="Confimar Cita"
          CancelButton="Cancelar"
          ConfirmButton="Confirmar"
          DialogTitle="Revise los datos de su cita"
          ConfirmDate="20/10/2024"
          ConfirmHour="15:00"
          OnSubmit={() => console.log('Enviar Datos')}
        />
      </div>
    </div>
  )
}