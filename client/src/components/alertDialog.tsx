"use client"

import { createAppointment } from "@/actions/appointment-action"
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

interface Props {
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
    hour: string
    formattedDate: string
    doctor: { id: number, name: string, dateYear: string }
}

export const AlertDialogCalendar = ({ openDialog, setOpenDialog, hour, formattedDate, doctor }: Props) => {

    const appointmentCreate = async () => {
        const appointment = await createAppointment({
            id_doctor: doctor.id, id_patient: 3, date: formattedDate, startTime: hour
        })

        if (appointment.message) {
            console.log(appointment.message)
        }

    }

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Detalles del turno</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Desea agendar turno con <span className="font-bold">{doctor.name}</span> el día <span className="font-semibold">{formattedDate}</span> a la <span className="font-semibold">{hour} ?</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-blue-500 px-6 py-[21px]" onClick={appointmentCreate}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
