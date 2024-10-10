import { DoctorComplete } from "@/interfaces/user"

interface Props {
  doctor: DoctorComplete
}

export function DoctorDetails({ doctor }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-2xl font-bold">{doctor.name}</p>
        <p>Especialidad: {doctor.speciality}</p>
        <p>DNI: {doctor.dni}</p>
        <p>Teléfono: {doctor.phone}</p>
        <p>Email: {doctor.email}</p>
        <p>Dirección:{doctor.address}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3>Turnos Disponibles:</h3>
        <div className="bg-gray-500 animate-pulse h-80 rounded" />
        <h4>Seleccionar Fecha:</h4>
        <div className="bg-gray-500 animate-pulse h-10 rounded" />

        <button type="button" className="bg-green-500 rounded px-4 py-2 text-white">Confirmar Cita</button>
      </div>


    </div>
  )
}