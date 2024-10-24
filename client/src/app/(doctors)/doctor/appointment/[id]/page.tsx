/* import { getAllAppointmentByPatient, getAppointmentById } from "@/actions/appointment-action";
import { fetchPatient } from "@/actions/patients/patientActions"; */
import { AppointmentFromResponse, AppointmentWithDoctor } from "@/interfaces/appointment";
import { PatientFromResponse } from "@/interfaces/user";
import { AppointmentDetails } from "@/ui";

const APPOINTMENT: AppointmentFromResponse = {
  id: 1,
  id_doctor: 1,
  id_patient: 1,
  date: "2024-10-24",
  startTime: "15:30",
  endTime: "16:00",
  status: "PROGRAMADA"
}

const PATIENT: PatientFromResponse = {
  id: 1,
  name: "Maria Cristina",
  dni: "12345678",
  obraSocial: "Obra Social de Prueba",
  numeroAsociado: "B123456",
  password: "test123",
  email: "mariacristina@gmail.com",
  phone: "1234567890",
  img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png',
  active: true,
  insurer: "Obra Social de Prueba"
}

const LAST_APPOINTMENTS: AppointmentWithDoctor[] = [
  {
    id: 1,
    id_doctor: 1,
    id_patient: 1,
    date: "2024-10-26",
    startTime: "16:30",
    endTime: "17:00",
    status: "PROGRAMADA",
    doctor: {
      id: 1,
      name: 'Dr. Ignacio López',
      dni: "11234567",
      email: 'ignacio.lopez@gmail.com',
      phone: '1123456789',
      active: true,
      img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
      specialization: 'Cardiología',
      licenseNumber: 'MP123456',
    }
  },
  {
    id: 2,
    id_doctor: 2,
    id_patient: 1,
    date: "2024-10-29",
    startTime: "15:30",
    endTime: "16:00",
    status: "PROGRAMADA",
    doctor: {
      id: 2,
      name: 'Dra. Valeria González',
      dni: "23123456",
      email: 'valeria.gonzalez@gmail.com',
      phone: '1198765432',
      active: true,
      img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
      specialization: 'Pediatría',
      licenseNumber: 'MP654321',
    }
  }
]

export default async function DoctorAppointmentPage({ params }: { params: { id: string } }) {
  console.log(params.id)
  /*   const appointment: AppointmentFromResponse = await getAppointmentById(params.id)
    const patient: PatientFromResponse = await fetchPatient(appointment.id_patient)
    const lastAppointments: AppointmentFromResponse[] = await getAllAppointmentByPatient(appointment.id_patient, 0, 2) */

  return (
    <AppointmentDetails appointment={APPOINTMENT} patient={PATIENT} lastAppointments={LAST_APPOINTMENTS} />
  );
}