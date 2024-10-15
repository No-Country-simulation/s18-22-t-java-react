"use client"

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar"
import { es } from 'date-fns/locale';
import { hourDataAm, hourDataPm } from "@/utils/data-hour";
import { useState } from "react";
import { AlertDialogCalendar } from "./alertDialog";

export function CalendarDemo() {

    const [openDialog, setOpenDialog] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [hour, setHour] = useState<string>("")

    const formatYear = format(date ?? new Date(), "MM/dd/yyyy")
    const formattedDate = format(formatYear, "EEEE d 'de' MMMM", { locale: es });

    return (
        <div className="grid grid-cols-3 gap-20 max-w-[1400px] mx-auto px-4 mt-10 ">

            {/* CALENDARIO  */}
            <Calendar
                className="col-span-2"
                mode="single"
                showOutsideDays={false}
                selected={date}
                onSelect={setDate}
                disabled={(date) => date.getDay() === 0 || date < new Date()}
            />

            {/* HORARIOS DISPONIBLES  */}
            <div>
                <span className="font-bold capitalize text-xl">{formattedDate}</span>
                <h2 >Horarios disponibles</h2>

                <div className="grid grid-cols-2 mt-6 justify-center justify-items-center max-w-[250px]">
                    <div>
                        <h3 className="font-bold text-xl mb-2 text-center">AM</h3>
                        <ul className="space-y-2">
                            {hourDataAm.map(item => (
                                <li
                                    onClick={() => { setHour(item.hour); setOpenDialog(true) }}
                                    key={item.hour}
                                    className="border border-gray-400 px-5 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white">
                                    {item.hour}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl mb-2 text-center">PM</h3>
                        <ul className="space-y-2">
                            {hourDataPm.map(item => (
                                <li
                                    onClick={() => { setHour(item.hour); setOpenDialog(true) }}
                                    key={item.hour}
                                    className="border border-gray-400 px-5 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white">
                                    {item.hour}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <AlertDialogCalendar
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                formattedDate={formattedDate}
                hour={hour} />
        </div>
    )
}
