import data from '../../../utils/data.json'
import { DoctorList } from "@/ui/doctors/List"
import { Search, SearchResults } from "@/components";
import { Suspense } from "react";

export default function AppointmentsPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
    speciality?: string;
    place?: string;
  };
}) {
  const query = searchParams?.q || '';

  const doctorListWithPlacesFiltered = data.doctors.filter((doctor, index, self) =>
    index === self.findIndex((d) => d.place === doctor.place)
  )
  const doctorListWithSpecialityFiltered = data.doctors.filter((doctor, index, self) =>
    index === self.findIndex((d) => d.speciality === doctor.speciality)
  )
  return (
    <div className="w-full max-w-[1480px] m-auto h-screen flex flex-col p-4 gap-4">
      <div className="relative flex flex-col">
        <Search placeholder="Buscá por profesional, establecimiento o especialidad..." />
        <Suspense key={query} fallback={'Cargando ...'}>
          <SearchResults query={query} />
        </Suspense>
      </div>

      {!query && (
        <>
          <h3 className='text-xl'>Especialidades</h3>
          <DoctorList list={doctorListWithSpecialityFiltered} title={"speciality"} />
          <h3 className='text-xl'>Establecimientos</h3>
          <DoctorList list={doctorListWithPlacesFiltered} title={"places"} />
        </>
      )}
    </div>
  )
}
