import { fetchPatient } from "@/actions/patients/patientActions";
import { EditProfileForm } from "@/components/profile/editProfileForm";
import { PatientByIdFromResponse } from "@/interfaces/user";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const data: PatientByIdFromResponse = await fetchPatient(params.id)

  return (
    <EditProfileForm data={data} />
  );
}