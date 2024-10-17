import { getDoctorsBySpecialty } from "@/actions/doctors/doctorActions";
import { DoctorCard } from "@/ui";

export default async function SpecialtyPage({ params }: { params: { name: string } }) {

    const specialty = decodeURIComponent(params.name)

    const doctors = await getDoctorsBySpecialty(specialty)


    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="max-w-[900px]">
                <h1 className="text-3xl">Traumatología</h1>

                <div className="my-8">
                    {
                        doctors?.map(doctor => (
                            <DoctorCard key={doctor.id} id={doctor.id} name={doctor.name} img={doctor.img} speciality={doctor.specialization} place="Clínica Colón" />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}