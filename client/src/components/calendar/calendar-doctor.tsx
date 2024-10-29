"use client"

import { Calendar } from "../ui/calendar";
import { SvgChevronNew } from "../svg/svgs";
import { format } from "date-fns";
import { useState } from "react";
import { AppointmentWithPatient } from "@/interfaces/appointment";
import Link from "next/link";

interface Props {
    appointments: AppointmentWithPatient[]
}

export function CalendarDoctor({ appointments }: Props) {

    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="grid grid-cols-[60%_40%] gap-8 ">
            {/* CITAS  */}
            <div className="">
                <p>Miércoles 23 de Octubre</p>
                <span className="text-gray-500">Pacientes de hoy</span>

                <div className="mt-8">
                    {
                        appointments.map((item, index) => (
                            <div key={index} className="p-7 flex justify-between items-center shadow-5xl rounded-xl mb-4">
                                <div className="font-bold">
                                    <h3><span className="text-blue-800">{item.startTime.slice(0, -3)}</span> {item.patient.name.charAt(0).toUpperCase() + item.patient.name.slice(1)}</h3>
                                    <p className="font-normal">Clínica Pueyrredón - Jujuy 2176</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span>Historia clínica</span>
                                    <Link href={'/doctor/appointment/' + item.id} className="flex items-center text-secondaryBlue-400 font-bold">Más información <SvgChevronNew /></Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* CALENDARIO  */}
            <div className="">
                <Calendar
                    className="col-span-2"
                    mode="single"
                    showOutsideDays={false}
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date.getDay() === 0 || format(date, 'yyyy-MM-dd') < format(new Date, 'yyyy-MM-dd')}
                />
            </div>
        </div>
    )
}
