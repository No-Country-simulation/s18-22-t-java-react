'use server'

import { Clinic, ClinicFromResponse } from '@/interfaces/clinic'

const BASE_URL = process.env.API_URL

export const getAllClinics = async () => {
  const url = BASE_URL + '/clinic/all'
  const data: Clinic[] = await fetch(url).then((res) => res.json())

  if (data) {
    return data
  }
  return []
}

export const getClinicById = async (id: number) => {
  const url = BASE_URL + '/clinic/' + id

  console.log(url)

  const data: ClinicFromResponse = await fetch(url).then((res) => res.json())

  if (!data) {
    return null
  }

  return data.responseClinic
}