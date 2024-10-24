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

interface Prop {
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
    messageAlert: MessageAlert
}

interface MessageAlert {
    title: string
    description: JSX.Element
    confirm: string
    cancel: string
}


export function AlertMessage({ openDialog, setOpenDialog, messageAlert }: Prop) {

    const route = useRouter()

    const handler = (data: string) => {
        if (data === "Reprogramar cita") {
            route.push("/appointment/calendar/1")
        }
    }

    return (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{messageAlert.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {messageAlert.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="hover:text-blue-700"
                    >{messageAlert.cancel}</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() => handler(messageAlert.confirm)}
                        className="bg-blue-500 px-6 py-[21px] hover:bg-blue-700"
                    >
                        {messageAlert.confirm}
                    </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
