'use server'

import { Doctors } from "@/interfaces/doctors"
import { hourData } from "@/utils/data-hour"
import { redirect } from "next/navigation"

const BASE_URL = process.env.API_URL

export const getAllDoctors = async () => {
  const url = BASE_URL + '/doctor/allDoctors'
  const data = await fetch(url).then((res) => res.json())

  if (data) {
    return data
  }

  return []
}

export const getDoctorById = async (id: number) => {
  const url = BASE_URL + '/doctor/getById/' + id

  const data: Doctors = await fetch(url).then((res) => res.json())

  if (!data) {
    redirect("/")
  }

  return data
}

export const getDoctorsBySpecialty = async (specialty: string) => {
  const url = BASE_URL + '/doctor/allDoctors'

  const data: Doctors[] = await fetch(url).then((res) => res.json())

  const filterBySpecialty = data.filter(doctor => doctor.specialization === specialty)

  if (!filterBySpecialty) {
    return undefined
  }

  return filterBySpecialty
}

export const getHoursDoctorId = async (id: number, dateDoctor: string) => {
  const baseUrl = "https://clinica-medica-production.up.railway.app"
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
  amHours: { hour: string; }[]
  pmHours: { hour: string; }[]
}

export const prueba = async (data: string, id: number): Promise<HoursDoctor> => {

  const url = BASE_URL + `/appointment/occupied-times/${id}?date=${data}`

  const hours = hourData
  const excludesHours = await fetch(url).then((res) => res.json())

  if (data) {
    const filterHours = hours.filter(item => !excludesHours.time.includes(item.hour))

    const amHours = filterHours.filter(item => parseInt(item.hour) < 12);
    const pmHours = filterHours.filter(item => parseInt(item.hour) >= 12);

    return { amHours, pmHours }
  }

  return { amHours: [], pmHours: [] }

}
