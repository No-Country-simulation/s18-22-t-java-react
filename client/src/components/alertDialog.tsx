"use client"

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
import { useRouter } from "next/navigation"

interface Props {
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
    hour: string
    formattedDate: string
}

export const AlertDialogCalendar = ({ openDialog, setOpenDialog, hour, formattedDate }: Props) => {

    const route = useRouter()

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Detalles del turno</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Desea agendar turno con Nombre del doctor el día <span className="font-semibold">{formattedDate}</span> a la <span className="font-semibold">{hour}</span>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => route.push("/calendar/confirmed/123")}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* <AlertDialog open={successful} onOpenChange={setSuccessful}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tu turno ha sido reservado</AlertDialogTitle>
                        <AlertDialogDescription>
                            Para el día  <span className="font-semibold">{formattedDate}</span> a la <span className="font-semibold">{hour}</span>  con [Nombre del doctor]
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </>
    )
}
