export interface Role {
  id: number
  name: string
}

export interface User {
  id?: number
  name: string
  password?: string
  rol?: number
  dni: string
  phone: string
  email: string
  address: string
  active?: boolean
}

export interface Doctor {
  id: number
  id_user: number
  speciality: string
  place: string
  address?: string
}

export interface DoctorComplete extends User {
  speciality: string
}

export interface DoctorForList {
  id: number
  name: string
  speciality: string
}

export interface Data {
  roles: Role[]
  users: User[]
  doctors: Doctor[]
}

export interface DoctorFromResponse {
  id: number
  name: string
  password?: string
  email: string
  phone: string
  img: string
  active: boolean
  specialization: string
  licenseNumber: string
  place?: string
  dni?: string
  obraSocial?: string
  numeroAsociado?: string
}
export interface PatientFromResponse {
  id: number
  name: string
  password: string
  email: string
  phone: string
  img: string
  active: boolean
  insurer: string
  dni?: string
  obraSocial?: string
  numeroAsociado?: string
  social_work?: string
  number_associate?: string
}

export interface PatientByIdFromResponse {
  id: number
  name: string
  email: string
  phone: string
  img: string
  active: boolean
  insurer: string
  social_work: string
  number_associate: string
}
