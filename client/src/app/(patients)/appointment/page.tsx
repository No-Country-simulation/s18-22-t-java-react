import { DoctorList } from "@/ui/doctors/List"
import { Search, SearchResults } from "@/components";
import { Suspense } from "react";
import { getAllDoctors } from '@/actions/doctors/doctorActions';
import { DoctorFromResponse } from "@/interfaces/user";
import { SwiperList } from "@/components/swiper/SwiperList";

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

  /* const doctorListWithPlacesFiltered = data.filter((doctor, index, self) =>
    index === self.findIndex((d) => d.place === doctor.place)
  ) */
  const doctorListWithSpecialityFiltered = data.filter((doctor, index, self) =>
    index === self.findIndex((d) => d.specialization === doctor.specialization)
  )

  const doctorListWithPlacesFiltered = [{
    id: 0,
    password: "",
    email: "",
    phone: "",
    active: true,
    specialization: "",
    licenseNumber: "",
    img: "",
    name: "Consultorio Principal",
    address: 'Jujuy 2176'
  }]


  return (
    <div className="w-[1480px] m-auto h-screen flex flex-col p-4 gap-4">
      <div className="relative flex flex-col">
        <Search placeholder="Buscá por profesional, establecimiento o especialidad..." />
        <Suspense key={query} fallback={'Cargando ...'}>
          <SearchResults query={query} data={data} />
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
          {doctorListWithPlacesFiltered.length === 0 ?
            <p>No hay especialidades disponibles</p> :
            <DoctorList list={doctorListWithPlacesFiltered} title={"places"} />
          }
        </>
      )}
    </div>
  )
}