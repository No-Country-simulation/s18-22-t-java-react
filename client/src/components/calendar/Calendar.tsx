"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    console.log(date)

    return (
        <div className="grid grid-cols-3 gap-20 max-w-[1400px] mx-auto px-4 mt-10 ">


            <Calendar
                className="col-span-2"
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date.getDay() === 0 || date < new Date()}
            />


            <div>
                <span className="font-bold">Miércoles 4 de octubre</span>
                <h2>Horarios disponibles</h2>

                <ul className="space-y-2 my-6">
                    {
                        Array.from({ length: 4 }).map((item, index) => (
                            <li key={index} className="border border-black rounded-md px-10 py-1 max-w-min">10:00</li>
                        ))
                    }
                </ul>

            </div>
        </div>
    )
}
