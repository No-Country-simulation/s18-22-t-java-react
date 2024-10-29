const BASE_URL = process.env.API_URL

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
