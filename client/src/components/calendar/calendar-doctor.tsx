"use client"

import { getAllAppointmentPatientsByDate } from "@/actions";
import { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { es } from 'date-fns/locale';
import { format } from "date-fns";
import Link from "next/link";
import { SvgChevronNew } from "../svg/svgs";
import { SkeletonDoctorPatients } from "../skeleton/skeleton-doctorPatients";

interface Props {
    user_id: number
    user_name: string
}

interface AppointmentPatient {
    id: number,
    id_doctor: number,
    id_patient: number,
    date: string,
    startTime: string,
    endTime: string,
    status: string,
    patient: { name: 'maria' }
}

export function CalendarDoctor({ user_id, user_name }: Props) {

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [loading, setLoading] = useState(false)
    const [appointments, setAppointments] = useState<AppointmentPatient[]>()

    const formatYear = format(date ?? new Date(), 'yyyy-MM-dd')
    const formattedDate = format(date ?? new Date(), "EEEE d 'de' MMMM", { locale: es });

    useEffect(() => {

        const allAppointment = async () => {
            const data = await getAllAppointmentPatientsByDate(user_id, formatYear)
            setAppointments(data)
        }
        allAppointment()
        setLoading(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])


    return (
        <div className="grid grid-cols-[60%_40%] gap-8 ">
            {/* CITAS  */}
            <div className="">
                <h2 className="text-6xl font-medium text-secondaryBlue-500">Bienvenido {user_name}!</h2>
                <p className="font-medium text-[32px] py-5">{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)} </p>
                <span className="font-medium text-[#5C5C5C] text-2xl">Pacientes de hoy</span>

                <div className="mt-8">
                    {
                        loading ? (
                            <>
                                {appointments?.length === 0 ? (
                                    <div className="p-7 flex justify-between items-center shadow-5xl rounded-xl mb-4">
                                        <p>No tiene pacientes programados para el dia de hoy</p>
                                    </div>
                                ) : (
                                    <>
                                        {appointments?.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((item, index) => (
                                            <div key={index} className="p-7 flex justify-between items-center shadow-5xl rounded-xl mb-4">
                                                <div className="font-bold">
                                                    <h3><span className="font-bold text-[22px] text-blue-800">{item.startTime.slice(0, -3)}</span> {item.patient.name}</h3>
                                                    <p className="font-normal">Clínica Pueyrredón - Jujuy 2176</p>
                                                </div>
                                                <div className="flex items-center gap-6 text-lg">
                                                    <span className="font-medium text-[#5C5C5C]">Historia clínica</span>
                                                    <Link href={'/doctor/appointment/' + item.id} className="flex items-center text-secondaryBlue-500 font-medium">Más información <SvgChevronNew /></Link>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </>
                        ) : (
                            Array.from({ length: 3 }).map((item, index) => (
                                <SkeletonDoctorPatients key={index} />
                            ))
                        )
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
