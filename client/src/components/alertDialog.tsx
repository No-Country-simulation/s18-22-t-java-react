
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
import { useState } from "react"

interface Props {
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
    hour: string
    formattedDate: string
}

export const AlertDialogCalendar = ({ openDialog, setOpenDialog, hour, formattedDate }: Props) => {

    const [successful, setSuccessful] = useState(false)

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
                        <AlertDialogAction onClick={() => setSuccessful(true)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={successful} onOpenChange={setSuccessful}>
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
            </AlertDialog>
        </>
    )
}
