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
export interface CreateAppointment {
  id_doctor: number
  id_patient: number
  date: string
  startTime: string
}

// LO QUE REGRESA LAS CITAS DEL PACIENTE
export interface AllAppointmentByPatient {
  content: AppointmentPatient[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface AppointmentPatient {
  id: number
  id_doctor: number
  id_patient: number
  date: string
  startTime: string
  endTime: string
  status: string
}

export interface AppointmentWithPatient extends AppointmentFromResponse {
  patient: {
    name: string
  }
}

export interface RescheduleAppointment {
  newDate: string
  newStartTime: string
}
