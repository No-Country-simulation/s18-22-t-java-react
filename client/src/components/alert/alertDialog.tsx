"use client"

import { createAppointment, rescheduleAppointment } from "@/actions/appointment-action"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { IconX } from "../icons"
import { RescheduleAppointment } from "@/interfaces/appointment"
import { format } from 'date-fns';
import { useState } from "react"

interface Props {
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
    hour: string
    formattedDate: string
    doctor: { id: number, name: string, dateYear: string }
    patientId: number
    reschedule: boolean
    appointmentId: number
}

export const AlertDialogCalendar = ({ openDialog, setOpenDialog, hour, formattedDate, doctor, patientId, reschedule, appointmentId }: Props) => {
    console.log(hour, formattedDate)
    const [error, setError] = useState<string | null>(null);


    const appointmentCreate = async () => {
        if (reschedule) {
            const formattedDate = format(new Date(doctor.dateYear + 'T00:00:00'), 'yyyy-MM-dd');
            console.log('formattedDate', formattedDate);
            try {
                const newAppointment: RescheduleAppointment = {
                    newDate: formattedDate,
                    newStartTime: hour
                }
                console.log('newAppointment', newAppointment);
                const response = await rescheduleAppointment(appointmentId, newAppointment);
                console.log(response);

                if (response && response.error) {
                    setError(response.error);
                    setTimeout(() => {
                        setError(null);
                    }, 7000);
                }
                setOpenDialog(false);
            } catch (error) {
                console.error("Failed to reschedule appointment:", error);
                setError("Error al reprogramar la cita. Por favor, intente nuevamente.");
            }

        } else {
            try {
                const response = await createAppointment({
                    id_doctor: doctor.id, id_patient: patientId, date: doctor.dateYear, startTime: hour
                });
                console.log(response);

                if (response && response.error) {
                    setError(response.error);
                    setTimeout(() => {
                        setError(null);
                    }, 7000);
                }
                setOpenDialog(false);
            } catch (error) {
                console.error("Failed to create appointment:", error);
                setError("Error al crear la cita. Por favor, intente nuevamente.");
            }
        }
    }

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent className="!w-[1146px] !max-w-[1146px] h-[625px] px-[270px] content-center">
                    <AlertDialogHeader>
                        <div className="flex items-center justify-center">
                            <AlertDialogTitle className="text-5xl font-medium text-[#1A2C33]">Detalles del Turno</AlertDialogTitle>
                            <button
                                className="absolute top-16 right-16"
                                onClick={() => setOpenDialog(false)}
                            >
                                <IconX />
                            </button>
                        </div>
                        <AlertDialogDescription className="text-[#5C5C5C] text-2xl">
                            ¿Desea agendar turno con <span className="font-bold">{doctor.name}</span> el día <span className="font-semibold">{formattedDate}</span> a la <span className="font-semibold">{hour} ?</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="w-[274px] h-16 rounded-xl border-2 border-blue-500 bg-white text-blue-500 text-lg">Cancelar</AlertDialogCancel>

                        <AlertDialogAction
                            className="w-[274px] h-16 rounded-xl border border-blue-500 bg-blue-500 text-white text-lg" onClick={appointmentCreate}>
                            Confirmar
                        </AlertDialogAction>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {error && (
                <div className="absolute top-0 -right-72 w-64 rounded-xl px-4 py-6 shadow-2xl">
                    <h4 className="font-semibold text-[22px] pb-4 border-b-2 border-[#B9B7B7]">Notificaciones</h4>
                    <p className="pt-4">
                        {error}
                    </p>
                </div>
            )}
        </>
    )
}
