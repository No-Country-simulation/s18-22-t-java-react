'use server'

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

  const data = await fetch(url).then((res) => res.json())

  if (data) {
    return data
  }

  return null
}
