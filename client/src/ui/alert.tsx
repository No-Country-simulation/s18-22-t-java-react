'use client'

interface Props {
  ClassName: string
  Type: 'Warning' | 'Danger' | 'Info'
  ButtonText: string,
  DialogTitle: string,
  ConfirmDate: string,
  ConfirmHour: string,
  CancelButton: string,
  ConfirmButton: string,
  OnSubmit: () => void
}

import { DangerIcon, InfoIcon, WarningIcon } from '@/components/icons'
import { useState } from 'react'

export function Alert({ ClassName, Type, ButtonText, DialogTitle, ConfirmDate, ConfirmHour, CancelButton, ConfirmButton, OnSubmit }: Props) {
  const [open, setOpen] = useState(false)

  const ButtonColor = Type === 'Info' ? 'bg-blue-500 hover:bg-blue-400' : Type === 'Warning' ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-red-500 hover:bg-red-400'
  const IconColor = Type === 'Info' ? '#3b82f6' : Type === 'Warning' ? '#eab308' : '#ef4444'


  return (
    <>
      {open && (
        <div className="relative z-10">
          <div className="fixed inset-0 z-10 flex items-end justify-center overflow-y-auto p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                    {Type === 'Info' ? (<InfoIcon color={IconColor} />) :
                      Type === 'Warning' ? (<WarningIcon color={IconColor} />) :
                        (<DangerIcon color={IconColor} />)
                    }
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      {DialogTitle}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">La fecha de su cita es {ConfirmDate} a las {ConfirmHour}hs.</p>
                      <p className="text-sm text-gray-500">¿Confirma el horario?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    OnSubmit()
                    setOpen(false)
                  }}
                  className={`inline-flex w-full justify-center rounded-md ${ButtonColor}  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                >
                  {ConfirmButton}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  {CancelButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        className={`${ClassName} px-4 py-2 rounded`}
        onClick={() => setOpen(true)}
      >{ButtonText}</button>
    </>
  )
}
