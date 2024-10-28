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
import { IconX } from "../icons"

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
            <AlertDialogContent className="!w-[1146px] !max-w-[1146px] h-[625px] px-[270px] content-center">
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <AlertDialogTitle className="text-5xl font-medium text-[#1A2C33]">{messageAlert.title}</AlertDialogTitle>
                        <button
                            className="absolute top-16 right-16"
                            onClick={() => setOpenDialog(false)}
                        >
                            <IconX />
                        </button>
                    </div>
                    <AlertDialogDescription className="text-[#5C5C5C] text-2xl">
                        {messageAlert.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="w-[274px] h-16 rounded-xl border-2 border-blue-500 bg-white text-blue-500 text-lg"
                    >{messageAlert.cancel}</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() => handler(messageAlert.confirm)}
                        className="w-[274px] h-16 rounded-xl border border-blue-500 bg-blue-500 text-white text-lg"
                    >
                        {messageAlert.confirm}
                    </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
