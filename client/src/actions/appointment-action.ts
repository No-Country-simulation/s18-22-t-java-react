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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id_doctor": id_doctor,
            "id_patient": id_patient,
            "date": date,
            "startTime": startTime,
            "status": "PROGRAMADA"
        })
    }).then((res) => res.json())

    if (data) {
        redirect(`/appointment/confirmed/${data.id}`)
    }

    console.log("error al crear la cita")

}