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
