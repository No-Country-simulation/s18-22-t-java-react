import { getAllProgramedAppointments } from "@/actions/appointment-action";
import { AppointmentWithDoctor } from "@/interfaces/appointment";
import { DoctorCard } from "@/ui";

export const revalidate = 0

export default async function DashboardPage() {

    const doctorList: AppointmentWithDoctor[] = await getAllProgramedAppointments(44)

    return (
        <div className="max-w-[1200px] mx-auto px-10 my-16">

            <h2 className="text-6xl font-medium text-secondaryBlue-500">Te damos la bienvenida Maria!</h2>

            <div className="flex flex-col gap-2 my-10">
                <h3 className="text-[32px] text-[#1A2C33] mb-10">Tus turnos ya agendados:</h3>

                {/* RESERVA DE CITAS  */}
                {doctorList.map((item, index) => (
                    <DoctorCard dashboard id={item.id} img={item.doctor.img} key={index} name={item.doctor.specialization} speciality={item.doctor.name} place="Clinica Colon - Jujuy 2176" date={item.date} startTime={item.startTime} />
                ))}

                {doctorList.length === 0 && <h4 className="bg-[#F6F7F7] w-[858px] rounded-xl text-xl p-7 text-[#1A2C33] mb-10">Aún no tenes ningún turno agendado.</h4>}
            </div>

        </div>
    );
}