import data from '../../../utils/data.json'
import { DoctorList } from "@/ui/doctors/List"

export default function AppointmentsPage() {
  const doctorListWithPlacesFiltered = data.doctors.filter((doctor, index, self) =>
    index === self.findIndex((d) => d.place === doctor.place)
  )
  const doctorListWithSpecialityFiltered = data.doctors.filter((doctor, index, self) =>
    index === self.findIndex((d) => d.speciality === doctor.speciality)
  )
  return (
    <div className="flex flex-col p-4 gap-4">
      <h3>Lista de Especialidades</h3>
      <DoctorList list={doctorListWithSpecialityFiltered} title={"speciality"} />
      <h3>Lista de Establecimientos</h3>
      <DoctorList list={doctorListWithPlacesFiltered} title={"places"} />
    </div>
  )
}
