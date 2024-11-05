const BASE_URL = process.env.API_URL

export const fetchPatient = async (patientId: string | number) => {
  const url = BASE_URL + '/patients/search/' + patientId
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Ocurrio un error al obtener los datos del paciente')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error: ', error)
    return null
  }
}
