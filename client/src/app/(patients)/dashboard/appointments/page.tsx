import { getAllProgramedAppointments } from "@/actions/appointment-action";
import { getWaitingList } from "@/actions/waitingList/waitingListActions";
import { AppointmentWithDoctor } from "@/interfaces/appointment";
import { DoctorCard, WaitList } from "@/ui";
import { cookies } from 'next/headers'

export const revalidate = 0

export default async function DashboardAppointmentPage() {
  const userCookie = cookies().get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : {};

  const waitList = await getWaitingList(user.id)
  console.log('waitList2', waitList);

  const doctorList: AppointmentWithDoctor[] = await getAllProgramedAppointments(user.id)


  return (
    <div className="flex gap-40 mx-auto px-10 my-16 text-[#1A2C33]">
      <div>
        <h2 className="text-[32px] font-medium">Revisá y gestioná tus turnos</h2>

        <div className="flex flex-col gap-2 my-10">
          <h3 className="text-2xl font-medium mb-10">Tus turnos ya agendados:</h3>

          {/* RESERVA DE CITAS  */}
          {doctorList.map((item, index) => (
            <DoctorCard dashboard id={item.id} img={item.doctor.img} key={index} name={item.doctor.specialization} specialty={item.doctor.name} place="Clinica Colon - Jujuy 2176" date={item.date} />
          ))}
        </div>

      </div>
      <div className="flex flex-col justify-center mt-12">
        <WaitList confirmWaitList={false} waitList={waitList} />
      </div>
    </div>
  );
}