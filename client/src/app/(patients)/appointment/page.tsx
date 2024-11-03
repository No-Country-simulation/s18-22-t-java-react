import { DoctorList } from "@/ui/doctors/List"
import { Search, SearchResults } from "@/components";
import { Suspense } from "react";
import { getAllDoctors } from '@/actions/doctors/doctorActions';
import { DoctorFromResponse } from "@/interfaces/user";
import { SwiperList } from "@/components/swiper/SwiperList";
import { getAllClinics } from "@/actions/clinics/clinicActions";
import { Clinic } from "@/interfaces/clinic";

export const revalidate = 0

export default async function AppointmentsPage({
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

  const data: DoctorFromResponse[] = await getAllDoctors()
  const clinicList: Clinic[] = await getAllClinics()

  const doctorListWithSpecialityFiltered = data.filter((doctor, index, self) =>
    index === self.findIndex((d) => d.specialization === doctor.specialization)
  )


  return (
    <div className="container mx-auto h-screen flex flex-col p-4 gap-4">
      <div className="relative flex flex-col">
        <Search placeholder="Buscá por profesional, establecimiento o especialidad..." />
        <Suspense key={query} fallback={'Cargando ...'}>
          <SearchResults query={query} data={data} clinicList={clinicList} />
        </Suspense>
      </div>

      {!query && (
        <>
          <h3 className='text-2xl text-[#1A2C33] mb-2'>Especialidades</h3>
          {doctorListWithSpecialityFiltered.length === 0 ?
            <p>No hay especialidades disponibles</p> :
            <SwiperList list={doctorListWithSpecialityFiltered} />
          }
          <h3 className='text-2xl text-[#1A2C33] my-2'>Establecimientos</h3>
          {clinicList.length === 0 ?
            <p>No hay especialidades disponibles</p> :
            <DoctorList list={clinicList} title={"places"} />
          }
        </>
      )}
    </div>
  )
}
