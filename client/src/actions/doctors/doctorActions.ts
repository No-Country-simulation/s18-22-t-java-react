'use server'

import { hourData } from '@/utils/data-hour'
import { redirect } from 'next/navigation'
import { SchemaDoctor } from '@/schemas'
import { DoctorFromResponse } from '@/interfaces/user'

const BASE_URL = process.env.API_URL

const doctors = [
  {
    id: 1,
    name: 'Dr. Ignacio López',
    password: 'ignacio123',
    email: 'ignacio.lopez@gmail.com',
    phone: '1123456789',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Cardiología',
    licenseNumber: 'MP123456',
  },
  {
    id: 2,
    name: 'Dra. Valeria González',
    password: 'valeria321',
    email: 'valeria.gonzalez@gmail.com',
    phone: '1198765432',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Pediatría',
    licenseNumber: 'MP654321',
  },
  {
    id: 3,
    name: 'Maria',
    password: 'Perez',
    email: 'pr@gmail.com',
    phone: '2216149336',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Cardiología',
    licenseNumber: '1234',
  },
  {
    id: 4,
    name: 'Dr. Javier Martínez',
    password: 'javier123',
    email: 'javier.martinez@gmail.com',
    phone: '1145678901',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Cardiología',
    licenseNumber: 'MP345678',
  },
  {
    id: 5,
    name: 'Dra. Ana García',
    password: 'ana1234',
    email: 'ana.garcia@gmail.com',
    phone: '1134567890',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Traumatología',
    licenseNumber: 'MP234567',
  },
  {
    id: 6,
    name: 'Dr. Pablo Hernández',
    password: 'pablo321',
    email: 'pablo.hernandez@gmail.com',
    phone: '1144321987',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Neurología',
    licenseNumber: 'MP765432',
  },
  {
    id: 7,
    name: 'Dra. Laura Fernández',
    password: 'laura123',
    email: 'laura.fernandez@gmail.com',
    phone: '1156781234',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Dermatología',
    licenseNumber: 'MP876543',
  },
  {
    id: 8,
    name: 'Dr. Matías Torres',
    password: 'matias123',
    email: 'matias.torres@gmail.com',
    phone: '1167894321',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Traumatología',
    licenseNumber: 'MP987654',
  },
  {
    id: 9,
    name: 'Dra. Carolina Pérez',
    password: 'carolina123',
    email: 'carolina.perez@gmail.com',
    phone: '1176543210',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Traumatología',
    licenseNumber: 'MP543210',
  },
  {
    id: 10,
    name: 'Dr. Alejandro Sosa',
    password: 'alejandro123',
    email: 'alejandro.sosa@gmail.com',
    phone: '1187654321',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Pediatría',
    licenseNumber: 'MP432109',
  },
  {
    id: 11,
    name: 'Dra. Gabriela Torres',
    password: 'gabriela321',
    email: 'gabriela.torres@gmail.com',
    phone: '1198765430',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Pediatría',
    licenseNumber: 'MP654210',
  },
  {
    id: 12,
    name: 'Dr. Fernando Gómez',
    password: 'fernando123',
    email: 'fernando.gomez@gmail.com',
    phone: '1186543210',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png',
    active: true,
    specialization: 'Neurología',
    licenseNumber: 'MP543210',
  },
  {
    id: 13,
    name: 'Dra. Julia Martín',
    password: 'julia321',
    email: 'julia.martin@gmail.com',
    phone: '1176541234',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Neurología',
    licenseNumber: 'MP432156',
  },
  {
    id: 14,
    name: 'Dra. Julia Martín',
    password: 'julia321',
    email: 'julia.martin@gmail.com',
    phone: '1176541234',
    img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png',
    active: true,
    specialization: 'Psicología',
    licenseNumber: 'MP432156',
  },
]

export const getAllDoctors = async () => {
  /*   const url = BASE_URL + '/doctor/allDoctors'
  const data = await fetch(url).then((res) => res.json())

  if (data) {
    return data
  }
  return [] */

  return doctors
}

export const getDoctorById = async (id: number) => {
  const url = BASE_URL + '/doctor/getById/' + id

  const data: DoctorFromResponse = await fetch(url).then((res) => res.json())

  if (!data) {
    redirect('/')
  }

  return data
}

export const getDoctorsBySpecialty = async (specialty: string) => {
  /*   const url = BASE_URL + '/doctor/allDoctors'

  const data: Doctors[] = await fetch(url).then((res) => res.json())
 */
  const filterBySpecialty = doctors.filter(
    (doctor) => doctor.specialization === specialty
  )

  if (!filterBySpecialty) {
    return undefined
  }

  return filterBySpecialty
}

export const getHoursDoctorId = async (id: number, dateDoctor: string) => {
  const baseUrl = 'https://clinica-medica-production.up.railway.app'
  // const url = BASE_URL + `/appointment/occupied-times/${id}?date=${dateDoctor}`
  const url = baseUrl + `/appointment/occupied-times/${id}?date=${dateDoctor}`
  // /appointment/occupied-times/1?date=2024-10-18

  const data = await fetch(url).then((res) => res.json())

  if (data) {
    return data
  } else {
    return { message: data.message }
  }
}

interface HoursDoctor {
  amHours: { hour: string }[]
  pmHours: { hour: string }[]
}

export const prueba = async (
  data: string,
  id: number
): Promise<HoursDoctor> => {
  const url = BASE_URL + `/appointment/occupied-times/${id}?date=${data}`

  const hours = hourData
  const excludesHours = await fetch(url).then((res) => res.json())

  if (data) {
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
    id: doctor.id,
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
    console.log(responseData)

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
