'use server'

const BASE_URL = process.env.API_URL
console.log('base url', BASE_URL)

export const getWaitingList = async (id_patient: number) => {
  const url = BASE_URL + '/waiting-list/getList/' + id_patient
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (error) {
    console.error('Error: ', error)
    return null
  }
}

export const createWaitingList = async (
  id_patient: number,
  id_doctor: number,
  requested_date: string
) => {
  const url = BASE_URL + '/waiting-list/create'
  const body = {
    id_patient: id_patient,
    id_doctor: id_doctor,
    requested_date: requested_date,
  }
  console.log(url)
  console.log(body)

  try {
    const data = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => res.json())
    console.log('data', data)
    return data
  } catch (error) {
    console.error('Error: ', error)
    return null
  }
}
