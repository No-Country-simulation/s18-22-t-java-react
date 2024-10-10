"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction"
import { useState } from 'react'

interface Prop {
    title: string
    date: Date | string
    color: string
}

export default function Calendar() {

    const [selectData, setSetSelectData] = useState<Prop>({ title: "", date: "", color: "" })

    const handleDateClick = (arg: DateClickArg) => {
        setSetSelectData({ title: "Reservado", date: arg.dateStr, color: "#ef4444" })
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[selectData]}
            dateClick={handleDateClick}
        />
    )
}


