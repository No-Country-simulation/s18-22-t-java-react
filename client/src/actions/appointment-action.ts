'use server'

import { redirect } from 'next/navigation'
import { getDoctorById } from './doctors/doctorActions'
import {
  AppointmentFromResponse,
  AppointmentWithDoctor,
} from '@/interfaces/appointment'

interface Prop {
  id_doctor: number
  id_patient: number
  date: string
  startTime: string
}

const BASE_URL = process.env.API_URL

export const createAppointment = async ({
  id_doctor,
  id_patient,
  date,
  startTime,
}: Prop) => {
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

  if (data) {
    redirect(`/appointment/confirmed/${data.id}`)
  }

  console.log('error al crear la cita')
}

export const getAppointmentById = async (id: string) => {
  const url = BASE_URL + '/appointment/get_by_id/' + id

  try {
    const data = await fetch(url).then((res) => res.json())
    if (!data) {
      console.log('error al obtener la cita ', id)
    }
    return data
  } catch (error) {
    console.log('error en el servidor', error)
  }
}

export const getAllAppointmentByPatient = async (
  id: number,
  page?: number,
  size?: number
) => {
  const pageNumber = page ? page : 0
  const pageSize = size ? size : 10
  const url =
    BASE_URL +
    'appointment/get_all_by_patient/' +
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

    //no esta testeado
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
