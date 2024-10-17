import { DoctorDetails } from '@/ui/doctors/Details'
import { getDoctorById } from '@/actions/doctors/doctorActions'

export default async function AppointmentById({ params }: { params: { id: string } }) {
  const id = Number(params.id)

  const doctor = await getDoctorById(id)

  return (
    <div className="flex flex-col p-4 gap-4">
      <h3>Agenda del doctor </h3>
      <DoctorDetails doctor={doctor} />
    </div>
  )
}