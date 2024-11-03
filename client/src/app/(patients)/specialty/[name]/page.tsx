import { getDoctorsBySpecialty } from "@/actions/doctors/doctorActions";
import { BackButton } from "@/components";
import { DoctorCard } from "@/ui";

export const revalidate = 0

export default async function SpecialtyPage({ params }: { params: { name: string } }) {

    const specialty = decodeURIComponent(params.name)

    const doctors = await getDoctorsBySpecialty(specialty)


    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <BackButton />
            <div className="max-w-[900px]">
                <h1 className="text-[32px] font-medium text-[#1A2C33]">{specialty.charAt(0).toUpperCase() + specialty.slice(1)}</h1>

                <div className="my-8 flex flex-col gap-6">
                    {
                        doctors?.map(doctor => (
                            <DoctorCard key={doctor.id} id_doctor={doctor.id} name={doctor.name} img={doctor.img} specialty={doctor.specialization} place="Clínica Colón" />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}