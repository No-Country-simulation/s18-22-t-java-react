import { DoctorFromResponse } from "@/interfaces/user";
import { CalendarDoctor } from "@/components";
import { cookies } from "next/headers";

export const revalidate = 0

export default async function CalendarDoctorPage() {
    const userCookie = cookies().get('user');
    const user: DoctorFromResponse = userCookie ? JSON.parse(userCookie.value) : {};

    return (
        <div className="max-w-[1400px] mx-auto px-6">
            <CalendarDoctor user_id={user.id} user_name={user.name} />
        </div>
    );
}