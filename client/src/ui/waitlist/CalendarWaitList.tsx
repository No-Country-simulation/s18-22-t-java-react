import { IconUser } from "@/components/icons"
import { ButtonComponent } from "../buttons/ButtonComponent"
import { createWaitingList } from "@/actions/waitingList/waitingListActions"
import { useState } from "react"
import { useRouter } from "next/navigation";

interface Props {
  confirmWaitList: boolean
  position: number
  setPosition: (value: number) => void
  date: string
  doctorId: number
  userId: number
}

export function CalendarWaitList({ confirmWaitList, position, setPosition, date, doctorId, userId }: Props) {
  const [success, setSuccess] = useState(false)
  const router = useRouter()


  const handleCreateWaitList = async () => {
    setSuccess(false)
    try {
      const response = await createWaitingList(userId, doctorId, date)
      if (response.id) {
        setPosition(position + 1)
        setSuccess(true)
        setTimeout(() => {
          router.push('/waitlist')
        }, 3000)
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return (
    <>
      {confirmWaitList || success ? (
        <div className="flex flex-col">
          <span className="text-xl font-medium mb-5 my-2">No hay horarios disponibles</span>
          <div className="flex items-center gap-3">
            {Array.from({ length: 5 }).map((_item, index) => (
              <div key={index}>
                {position > index ? (
                  <IconUser size={36} color="#B1CDE5" />
                ) : (
                  <IconUser size={36} />
                )}
              </div>
            ))}
          </div>
          <span className="text-lg font-medium mt-2">{position} de 5 cupos tomados</span>
          <ButtonComponent className="self-center my-6 font-medium" text="Estas en la lista de espera ✔" size="large" variant={"mainLight"} />
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-xl font-medium mb-5 my-2">No hay horarios disponibles</span>
          <div className="flex items-center gap-3">
            {Array.from({ length: 5 }).map((_item, index) => (
              <div key={index}>
                {position > index ? (
                  <IconUser size={36} color="#B1CDE5" />
                ) : (
                  <IconUser size={36} />
                )}
              </div>
            ))}
          </div>
          <span className="text-lg font-medium mt-2">{position} de 5 cupos tomados</span>
          <ButtonComponent onClick={handleCreateWaitList} className="self-center my-6 font-medium" text="Anotarme en lista de espera" size="large" variant={"dark"} />
        </div>
      )}
    </>
  );
}
