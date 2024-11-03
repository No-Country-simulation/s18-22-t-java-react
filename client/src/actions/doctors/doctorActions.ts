'use server'

import { DoctorFromResponse } from '@/interfaces/user'
import { hourData } from '@/utils/data-hour'
import { redirect } from 'next/navigation'
import { SchemaDoctor } from '@/schemas'

interface HoursDoctor {
  amHours: { hour: string }[]
  pmHours: { hour: string }[]
}

const BASE_URL = process.env.API_URL

export const getAllDoctors = async () => {
  const url = BASE_URL + '/doctor/allDoctors'
  const data = await fetch(url).then((res) => res.json())

  if (data) {
    return data
  }
  return []
}

export const getDoctorById = async (id_doctor: number) => {
  const url = BASE_URL + '/doctor/getById/' + id_doctor

  const data: DoctorFromResponse = await fetch(url).then((res) => res.json())

  if (!data) {
    redirect('/')
  }

  return data
}

export const getDoctorsBySpecialty = async (specialty: string) => {
  const url = BASE_URL + '/doctor/allDoctors'

  const data: DoctorFromResponse[] = await fetch(url).then((res) => res.json())

  const filterBySpecialty = data.filter(
    (doctor) => doctor.specialization === specialty
  )

  if (!filterBySpecialty) {
    return undefined
  }

  return filterBySpecialty
}

export const getHoursDoctorId = async (
  data: string,
  id_doctor: number
): Promise<HoursDoctor> => {
  const urlDoctor =
    BASE_URL + `/appointment/occupied-times/${id_doctor}?date=${data}`

  const hours = hourData
  const excludesHours = await fetch(urlDoctor).then((res) => res.json())

  console.log(excludesHours)

  if (excludesHours) {
    const filterHours = hours.filter(
      (item) => !excludesHours.time.includes(item.hour)
    )

    const amHours = filterHours.filter((item) => parseInt(item.hour) < 12)
    const pmHours = filterHours.filter((item) => parseInt(item.hour) >= 12)

    return { amHours, pmHours }
  }

  return { amHours: [], pmHours: [] }
}

export const editDoctor = async (
  data: FormData,
  doctor: DoctorFromResponse
) => {
  const url = BASE_URL + '/doctor/update/' + doctor.id

  const nameFromForm = data.get('name') as string
  const emailFromForm = data.get('email') as string
  const phoneFromForm = data.get('phone') as string
  const imgFromForm = data.get('img') as string

  const validatedFields = SchemaDoctor.safeParse({
    name: nameFromForm,
    email: emailFromForm,
    phone: phoneFromForm,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al actualizar el doctor.',
    }
  }

  const body = {
    name: nameFromForm,
    email: emailFromForm,
    specialization: doctor.specialization,
    phone: phoneFromForm,
    img: imgFromForm,
    password: doctor.password,
    licenseNumber: doctor.licenseNumber,
    dni: doctor.dni,
    active: doctor.active,
    obraSocial: doctor.obraSocial,
    numeroAsociado: doctor.numeroAsociado,
  }

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseData = await response.json()

    if (!responseData) {
      return {
        errors: {},
        updateError: null,
        message: 'Algo salio mal...',
      }
    }

    if (responseData.error) {
      return {
        errors: {},
        updateError: responseData.error,
        message: 'Error al actualizar el doctor',
      }
    }

    return {
      success: 'Actualización exitosa',
    }
  } catch (error) {
    return {
      errors: {},
      updateError: 'Error al comunicarse con el servidor' + error,
      message: 'Algo salió mal durante la actualización.' + error,
    }
  }
}

export const getAllSpecializationList = async () => {
  try {
    const doctors = await getAllDoctors()

    const specializationList = doctors.map((doctor: DoctorFromResponse) => {
      return doctor.specialization
    })

    const uniqueSpecializationList = Array.from(new Set(specializationList))

    const filteredDoctorsBySpecialization = uniqueSpecializationList.map(
      (specialization) => {
        return {
          specialization,
          doctors: doctors.filter(
            (doctor: DoctorFromResponse) =>
              doctor.specialization === specialization
          ),
        }
      }
    )

    return filteredDoctorsBySpecialization
  } catch (error) {
    console.error('Error fetching specialization list:', error)
    return []
  }
}
