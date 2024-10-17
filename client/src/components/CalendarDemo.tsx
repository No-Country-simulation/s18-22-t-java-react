"use client"

import { hourData, splitHours } from "@/utils/data-hour";
import { AlertDialogCalendar } from "./alertDialog";
import { Calendar } from "@/components/ui/calendar"
import { es } from 'date-fns/locale';
import { format } from "date-fns";
import { useState } from "react";

export function CalendarDemo() {
    const { amHours, pmHours } = splitHours(hourData);
    const [openDialog, setOpenDialog] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [hour, setHour] = useState<string>("")

    const formatYear = format(date ?? new Date(), 'yyyy-MM-dd')
    const formattedDate = format(formatYear, "EEEE d 'de' MMMM", { locale: es });

    const createHourItem = (hour: string) => (
        <li
            onClick={() => { setHour(hour); setOpenDialog(true) }}
            key={hour}
            className={`border border-gray-400 px-5 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white`}
        >
            {hour}
        </li>
    );

    const hourArray = ["10:00", "11:00", "08:00"]

    const filterHours = () => {

        if (formatYear === "2024-10-18") {
            return amHours.filter(item => !hourArray.includes(item.hour))
        } else { return amHours }
    }

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
                    {/* COLUMNA AM  */}
                    <div>
                        <h3 className="font-bold text-xl mb-2 text-center">AM</h3>
                        <ul className="space-y-2">
                            {filterHours().map((item) => createHourItem(item.hour))}
                        </ul>
                    </div>

                    {/* COLUMNA PM  */}
                    <div>
                        <h3 className="font-bold text-xl mb-2 text-center">PM</h3>
                        <ul className="space-y-2">
                            {pmHours.map((item) => createHourItem(item.hour))}
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
