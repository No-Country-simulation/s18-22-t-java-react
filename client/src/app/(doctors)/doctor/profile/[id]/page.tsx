import { fetchPatient } from "@/actions/patients/patientActions";
import { EditDoctorForm } from "@/components/profile/EditDoctorForm";
import { DoctorFromResponse } from "@/interfaces/user";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const data: DoctorFromResponse = await fetchPatient(params.id)

  return (
    <EditDoctorForm doctor={data} />
  );
}