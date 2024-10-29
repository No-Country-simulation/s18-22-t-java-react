import { getAllAppointmentByPatient, getAppointmentById } from "@/actions/appointment-action";
import { fetchPatient } from "@/actions/patients/patientActions";
import { AppointmentFromResponse, AppointmentWithDoctor } from "@/interfaces/appointment";
import { PatientFromResponse } from "@/interfaces/user";
import { AppointmentDetails } from "@/ui";

export default async function DoctorAppointmentPage({ params }: { params: { id: string } }) {
  const appointment: AppointmentFromResponse = await getAppointmentById(params.id)
  const patient: PatientFromResponse = await fetchPatient(appointment.id_patient)
  const lastAppointments: AppointmentWithDoctor[] = await getAllAppointmentByPatient(appointment.id_patient, 0, 2)

  return (
    <AppointmentDetails appointment={appointment} patient={patient} lastAppointments={lastAppointments} />
  );
}