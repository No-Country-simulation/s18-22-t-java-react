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
import { IconX } from "../icons"

interface Props {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  hour?: string
  formattedDate?: string
  doctor?: { id: number, name: string, dateYear: string }
  title: string
  description: string
  cancelText: string
  confirmText: string
  onConfirm: () => void
}

export const DialogComponent = ({
  openDialog,
  setOpenDialog,
  title,
  description,
  cancelText,
  confirmText,
  onConfirm
}: Props) => {

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent className="!w-[1146px] !max-w-[1146px] h-[625px] px-[270px] content-center">
        <AlertDialogHeader>
          <div className="flex items-center justify-center">
            <AlertDialogTitle className="text-5xl font-medium text-[#1A2C33]">{title}</AlertDialogTitle>
            <button
              className="absolute top-16 right-16"
              onClick={() => setOpenDialog(false)}
            >
              <IconX />
            </button>
          </div>
          <AlertDialogDescription className="text-[#5C5C5C] text-2xl">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-[274px] h-16 rounded-xl border-2 border-blue-500 bg-white text-blue-500 text-lg">{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className="w-[274px] h-16 rounded-xl border border-blue-500 bg-blue-500 text-white text-lg"
            onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
