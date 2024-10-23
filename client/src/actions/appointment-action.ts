"use server"

import { CreateAppointment } from "@/interfaces"
import { redirect } from "next/navigation"

const BASE_URL = process.env.API_URL

// POST CREAR CITA
export const createAppointment = async ({ id_doctor, id_patient, date, startTime }: CreateAppointment) => {

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

    if (data.id) {
        console.log({ data })
        redirect(`/appointment/confirmed/${data.id}`)
    }

    console.log("error al crear la cita")
}

export const getAppointmentById = async (id: string) => {
    const urlAppointment = BASE_URL + `/appointment/get_by_id/${id}`
    const getAppointment = await fetch(urlAppointment).then(res => res.json())

    if (getAppointment.error) {
        redirect("/")
    }

    const urlDoctor = BASE_URL + `/doctor/getById/${getAppointment.id_doctor}`
    const getDoctor = await fetch(urlDoctor).then(res => res.json()).catch(err => console.log(err))

    return {
        date: getAppointment.date,
        starTime: getAppointment.startTime,
        doctorName: getDoctor.name
    }
}