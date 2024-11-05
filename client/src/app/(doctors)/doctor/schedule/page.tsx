import { ScheduleDoctor } from "@/components";

export const revalidate = 0

export default async function SheduleDoctorPage() {

  return (
    <div className="max-w-[1400px] mx-auto px-6">
      <ScheduleDoctor />
    </div>
  );
}