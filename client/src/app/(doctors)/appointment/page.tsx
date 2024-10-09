import { Data } from "@/interfaces/user"
import data from '../../../utils/data.json'
import { DoctorList } from "@/ui/doctors/List"

export default function AppointmentsPage() {
  const getDoctorData = (data: Data) => {
    const doctorList = data.doctors.map((doctor) => {
      const user = data.users.find((user) => user.id === doctor.id_user)
      return {
        id: user?.id || 0,
        name: user?.name || "Error",
        speciality: doctor.speciality
      }
    })
    return doctorList
  }

  const list = getDoctorData(data)

  return (
    <div className="flex flex-col p-4 gap-4">
      <h3>Lista de Profesionales</h3>
      <DoctorList list={list} />
    </div>
  )
}
