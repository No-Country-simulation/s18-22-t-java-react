import { fetchPatient } from "@/actions/patients/patientActions";
import { EditProfileForm } from "@/components/profile/editProfileForm";
import { PatientFromResponse } from "@/interfaces/user";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const data: PatientFromResponse = await fetchPatient(params.id)

  return (
    <EditProfileForm data={data} />
  );
}