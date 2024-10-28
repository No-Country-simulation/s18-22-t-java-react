import { getAllProgramedAppointments } from "@/actions/appointment-action";
import { AppointmentWithDoctor } from "@/interfaces/appointment";
import { DoctorCard, WaitList } from "@/ui";

export const revalidate = 60

export default async function DashboardAppointmentPage() {
  const waitList = {
    name: "Dra. Mónica Gonzalez",
    specialization: "Traumatología",
    date: "04/11/2024",
    establishment: "Clinica Pueyrredón - Jujuy 2176",
    startTime: "15:20",
    position: 2
  }

  const doctorList: AppointmentWithDoctor[] = await getAllProgramedAppointments(44)


  return (
    <div className="flex gap-40 mx-auto px-10 my-16 text-[#1A2C33]">
      <div>
        <h2 className="text-[32px] font-medium">Revisá y gestioná tus turnos</h2>

        <div className="flex flex-col gap-2 my-10">
          <h3 className="text-2xl font-medium mb-10">Tus turnos ya agendados:</h3>

          {/* RESERVA DE CITAS  */}
          {doctorList.map((item, index) => (
            <DoctorCard dashboard id={item.id} img={item.doctor.img} key={index} name={item.doctor.specialization} speciality={item.doctor.name} place="Clinica Colon - Jujuy 2176" date={item.date} />
          ))}
        </div>

      </div>
      <div className="flex flex-col justify-center mt-12">
        <WaitList confirmWaitList={false} waitList={waitList} />
      </div>
    </div>
  );
}