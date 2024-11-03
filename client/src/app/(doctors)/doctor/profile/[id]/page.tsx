import { getDoctorById } from "@/actions/doctors/doctorActions";
import { EditDoctorForm } from "@/components/profile/EditDoctorForm";
import { DoctorFromResponse } from "@/interfaces/user";

export const revalidate = 0

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const data: DoctorFromResponse = await getDoctorById(id)

  return (
    <EditDoctorForm doctor={data} />
  );
}