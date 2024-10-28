export interface ClinicFromResponse {
  id: number
  responseClinic: Clinic
}

export interface Clinic {
  id?: number
  name: string
  cuit: string
  address: string
  phone: string
  description: string
  vlinicImage: string
  active: boolean
}
