"use server"

import { redirect } from "next/navigation"

interface Prop {
    id_doctor: number
    id_patient: number
    date: string
    startTime: string
}

const BASE_URL = process.env.API_URL

export const createAppointment = async ({ id_doctor, id_patient, date, startTime }: Prop) => {

    const url = BASE_URL + '/appointment/schedule'

    const data = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "id_doctor": id_doctor,
            "id_patient": id_patient,
            "date": date,
            "startTime": startTime,
            "endTime": "20:00",
            "status": "PROGRAMADA"
        })
    }).then((res) => res.json())

    if (data) {
        redirect(`/appointment/confirmed/${data.id}`)
    }

    return { message: data.error }

}