import { Data } from '@/interfaces/user'
import data from '../../../../utils/data.json'
import { DoctorDetails } from '@/ui/doctors/Details'

export default async function AppointmentById({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  /*   const url = '../../../../utils/data.json'
    const data = await fetch(url) */

  const getDoctorData = (data: Data) => {
    const doctor = data.doctors.find((doctor) => {
      const user = data.users.find((user) => user.id === doctor.id_user && user.id === id)
      return user
    })

    const user = data.users.find((user) => user.id === doctor?.id_user)
    return {
      speciality: doctor?.speciality || 'error',
      name: user?.name || 'error',
      dni: user?.dni || '12312312',
      phone: user?.phone || 'error',
      email: user?.email || 'error',
      address: user?.address || 'error'
    }

  }

  const doctor = getDoctorData(data)

  return (
    <div className="flex flex-col p-4 gap-4">
      <h3>Agenda del doctor </h3>
      <DoctorDetails doctor={doctor} />
    </div>
  )
}