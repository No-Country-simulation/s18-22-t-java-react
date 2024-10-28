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
import { IconX } from "../icons"

interface Props {
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
    hour: string
    formattedDate: string
    doctor: { id: number, name: string, dateYear: string }
}

export const AlertDialogCalendar = ({ openDialog, setOpenDialog, hour, formattedDate, doctor }: Props) => {

    const appointmentCreate = async () => {
        try {
            const response = await createAppointment({
                id_doctor: doctor.id, id_patient: 44, date: doctor.dateYear, startTime: hour
            });
            console.log(response);

            if (response && response.error) {
                alert(response.error);
            }
            setOpenDialog(false);
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Failed to create appointment:", error);
            alert("Failed to create appointment. Please try again.");
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
        </>
    )
}
