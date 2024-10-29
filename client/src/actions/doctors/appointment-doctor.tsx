
"use server"

import { AllAppointmentByPatient, AppointmentFromResponse } from "@/interfaces/appointment"
import { fetchPatient } from "../patients/patientActions"

const BASE_URL = process.env.API_URL

export const getAllAppointmentPatientsByDate = async (
    id: number,
    date: string,
    page?: number,
    size?: number
) => {
    const pageNumber = page ? page : 0
    const pageSize = size ? size : 10
    const url =
        BASE_URL +
        '/appointment/get_all_by_doctor/' +
        id +
        '?page=' +
        pageNumber +
        '&size=' +
        pageSize
    const data: AllAppointmentByPatient = await fetch(url).then((res) => res.json())

    const filterByStatus = data.content.filter(
        (appointment: { status: string }) =>
            appointment.status === 'PROGRAMADA' || appointment.status === 'PENDIENTE'
    )

    const filterByDate = filterByStatus.filter(appointment => appointment.date === date)
    const appointmentsWithPatient = await Promise.all(
        filterByDate.map(async (appointment: AppointmentFromResponse) => {
            const patient = await fetchPatient(appointment.id_patient)
            return {
                ...appointment,
                patient: {
                    name: patient.name,
                },
            }
        })
    )

    return appointmentsWithPatient

}