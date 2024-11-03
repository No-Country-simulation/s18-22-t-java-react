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
            <DoctorCard dashboard id_doctor={item.doctor.id} img={item.doctor.img} id_appointment={item.id} key={index} name={item.doctor.specialization} specialty={item.doctor.name} place="Clinica Colon - Jujuy 2176" date={item.date} startTime={item.startTime} />
          ))}
          {doctorList.length === 0 && <h4 className="bg-[#F6F7F7] w-[858px] rounded-xl text-xl p-7 text-[#1A2C33] mb-10">Aún no tenes ningún turno agendado.</h4>}
        </div>

      </div>

      {waitList && !waitList.error && (
        <div className="flex flex-col justify-center mt-12">
          <WaitList confirmWaitList={false} waitList={waitList} />
        </div>
      )}
    </div>
  );
}