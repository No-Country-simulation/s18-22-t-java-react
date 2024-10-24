import { DoctorFromResponse } from './user'

export interface AppointmentFromResponse {
  id: number
  id_doctor: number
  id_patient: number
  date: string
  startTime: string
  endTime: string
  status: string
}

export interface AppointmentWithDoctor extends AppointmentFromResponse {
  doctor: DoctorFromResponse
}
