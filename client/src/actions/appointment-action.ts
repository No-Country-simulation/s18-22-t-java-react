'use server'

import { redirect } from 'next/navigation'
import { getDoctorById } from './doctors/doctorActions'
import {
  AppointmentFromResponse,
  AppointmentWithDoctor,
  RescheduleAppointment,
} from '@/interfaces/appointment'
import { CreateAppointment } from '@/interfaces'
import { fetchPatient } from './patients/patientActions'

const BASE_URL = process.env.API_URL

// POST CREAR CITA
export const createAppointment = async ({
  id_doctor,
  id_patient,
  date,
  startTime,
}: CreateAppointment) => {
  const url = BASE_URL + '/appointment/schedule'

  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_doctor: id_doctor,
      id_patient: id_patient,
      date: date,
      startTime: startTime,
      status: 'PROGRAMADA',
    }),
  }).then((res) => res.json())
  console.log('create appointment data', data)

  if (data.error) {
    if (data.error === 'Appointment already booked') {
      const error =
        'error al crear la cita, cita ya reservada: ya tienes una cita pendiente con este médico. Por favor, completa o cancela la cita actual antes de reservar una nueva. '
      console.log(error)
      return {
        error: error,
      }
    } else {
      const error = 'error al crear la cita ' + data.error + ': ' + data.message
      console.log(error)
      return {
        error: error,
      }
    }
  }

  if (data.id) {
    redirect(`/appointment/confirmed/${data.id}`)
  }

  console.log('error al crear la cita')
}

export const getAllAppointmentById_Patient = async (
  id: number,
  page?: number,
  size?: number
) => {
  const pageNumber = page ? page : 0
  const pageSize = size ? size : 10
  const url =
    BASE_URL +
    '/appointment/get_all_by_patient/' +
    id +
    '?page=' +
    pageNumber +
    '&size=' +
    pageSize

  try {
    const data = await fetch(url).then((res) => res.json())
    if (!data.content) {
      console.log('error al obtener las citas del paciente ', id)
      return []
    }

    const appointmentsWithDoctor = await Promise.all(
      data.content.map(async (appointment: AppointmentFromResponse) => {
        const doctor = await getDoctorById(appointment.id_doctor)
        const response: AppointmentWithDoctor = {
          ...appointment,
          doctor: doctor,
        }
        return response
      })
    )

    return appointmentsWithDoctor
  } catch (error) {
    console.log('error en el servidor', error)
    return []
  }
}

export const getAppointmentById = async (id: string) => {
  const urlAppointment = BASE_URL + `/appointment/get_by_id/${id}`
  const getAppointment = await fetch(urlAppointment).then((res) => res.json())

  if (getAppointment.error) {
    console.log(getAppointment)
    /* redirect('/') */
  }

  return getAppointment
}

export const getAllProgramedAppointments = async (id_patient: number) => {
  const data = await getAllAppointmentById_Patient(id_patient)
  if (!data) {
    return []
  }
  const programedAppointments = data.filter(
    (appointment) =>
      appointment.status === 'PROGRAMADA' || appointment.status === 'PENDIENTE'
  )
  return programedAppointments
}

export const cancelAppointment = async (id: number) => {
  const url = BASE_URL + '/appointment/cancel/' + id
  const data = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  console.log(url, data)

  if (data.error) {
    const error =
      'error al cancelar la cita ' + data.error + ': ' + data.message
    console.log(error)
    return {
      error: error,
    }
  }

  if (data.id) {
    redirect(`/doctor/appointment/canceled/${data.id}`)
  }

  return data
}

export const getAppointmentByDoctor = async (
  id: number,
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
  const data = await fetch(url).then((res) => res.json())

  if (!data) {
    return []
  }

  if (!data.content) {
    console.log('error al obtener las citas del doctor ', id)
    return []
  }

  const programedAppointments = data.content.filter(
    (appointment: { status: string }) =>
      appointment.status === 'PROGRAMADA' || appointment.status === 'PENDIENTE'
  )

  const appointmentsWithPatient = await Promise.all(
    programedAppointments.map(async (appointment: AppointmentFromResponse) => {
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

export const rescheduleAppointment = async (
  id: number,
  newAppointment: RescheduleAppointment
) => {
  const url = BASE_URL + '/appointment/reschedule/' + id
  const data = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAppointment),
  }).then((res) => res.json())

  if (data.error) {
    const error =
      'error al reprogramar la cita ' + data.error + ': ' + data.message
    console.log(error)
    return {
      error: error,
    }
  }

  if (data.id) {
    redirect(`/appointment/confirmed/${data.id}`)
  }

  return data
}
