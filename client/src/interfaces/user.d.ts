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
  password: string
  email: string
  phone: string
  img: string
  active: boolean
  specialization: string
  licenseNumber: string
  place?: string
  dni?: string
  establesiment?: string
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
}
