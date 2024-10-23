
export interface CreateAppointment {
    id_doctor: number
    id_patient: number
    date: string
    startTime: string
}

export interface AppointmentPatient {
    id: number
    id_doctor: number
    id_patient: number
    date: string,
    startTime: string,
    endTime: string,
    status: string
}
