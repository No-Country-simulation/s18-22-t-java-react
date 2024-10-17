'use server'

import { Doctors } from "@/interfaces/doctors"
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

export const getHoursDoctor = async (id: number) => {
  const url = BASE_URL + `/appointment/occupied-times/${id}`

  const data = await fetch(url).then((res) => res.json())

}