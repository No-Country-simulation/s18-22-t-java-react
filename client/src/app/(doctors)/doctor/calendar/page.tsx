import { SvgChevronNew } from "@/components";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { cookies } from "next/headers";
import { getAppointmentByDoctor } from "@/actions/appointment-action";
import { AppointmentWithPatient } from "@/interfaces/appointment";


export default async function CalendarDoctorPage() {
    const userCookie = cookies().get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : {};

    const appointments: AppointmentWithPatient[] = await getAppointmentByDoctor(user.id)
    return (
        <div className="max-w-[1400px] mx-auto px-6">

            <h2 className="text-4xl font-semibold text-secondaryBlue-600 my-6">Buenos días, Dr. Mónica</h2>
            <div className="grid grid-cols-[60%_40%] gap-8 ">
                {/* CITAS  */}
                <div className="">
                    <p>Miércoles 23 de Octubre</p>
                    <span className="text-gray-500">Pacientes de hoy</span>

                    <div className="mt-8">
                        {
                            appointments.map((item, index) => (
                                <div key={index} className="p-7 flex justify-between items-center shadow-5xl rounded-xl mb-4">
                                    <div className="font-bold">
                                        <h3><span className="text-blue-800">{item.startTime.slice(0, -3)}</span> {item.patient.name.charAt(0).toUpperCase() + item.patient.name.slice(1)}</h3>
                                        <p className="font-normal">Clínica Colon - Jujuy 2176</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span>Historia clínica</span>
                                        <Link href={'/doctor/appointment/' + item.id} className="flex items-center text-secondaryBlue-400 font-bold">Más información <SvgChevronNew /></Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* CALENDARIO  */}
                <div className="">
                    <Calendar />
                </div>
            </div>
        </div>
    );
}