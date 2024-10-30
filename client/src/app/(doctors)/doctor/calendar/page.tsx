import { cookies } from "next/headers";
import { getAppointmentByDoctor } from "@/actions/appointment-action";
import { AppointmentWithPatient } from "@/interfaces/appointment";
import { CalendarDoctor } from "@/components";

export const revalidate = 0

export default async function CalendarDoctorPage() {
    const userCookie = cookies().get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : {};

    const appointments: AppointmentWithPatient[] = await getAppointmentByDoctor(user.id)
    return (
        <div className="max-w-[1400px] mx-auto px-6">
            <CalendarDoctor appointments={appointments} />
        </div>
    );
}