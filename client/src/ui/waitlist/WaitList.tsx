import { IconUser } from "@/components/icons"
import { ButtonComponent } from "../buttons/ButtonComponent"

interface Props {
  confirmWaitList: boolean
  waitList: {
    name_doctor: string
    speciality: string,
    date: string,
    name_clinic: string,
    address: string,
    position?: number
  }
}

export function WaitList({ confirmWaitList, waitList }: Props) {
  const position = waitList.position ?? 1;

  return (
    <>
      <h3 className="text-2xl font-medium mb-8">Tus listas de espera: </h3>
      <div className="flex flex-col text-[#1A2C33] w-[420px] h-[360px] shadow-2xl p-7 rounded-xl">
        <div className="flex flex-col text-start">
          <p className="text-2xl font-medium">{waitList.name_doctor}</p>
          <p className="text-[#3C4C51] font-medium mb-4">{waitList.speciality}</p>
          <p className="text-[#3C4C51]">{waitList.date}</p>
          <p className="text-[#3C4C51] mb-6">{waitList.name_clinic} - {waitList.address}</p>
        </div>
        {confirmWaitList ? (
          <div className="flex flex-col">
            <span className="font-medium mb-5">Te Asignaron el turno</span>
            <div className="flex items-center gap-3">
              <IconUser />
              {/* <span className="text-4xl">{waitList.startTime}hs.</span> */}
            </div>
            <ButtonComponent className="self-center my-6 font-medium" text="No quiero este turno" size="large" variant={"mainLight"} />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              {Array.from({ length: 5 }).map((_item, index) => (
                <div key={index}>
                  {position > index ? (
                    <IconUser size={36} />
                  ) : (
                    <IconUser size={36} color="#B1CDE5" />
                  )}
                </div>
              ))}
            </div>
            <span className="text-[#3C4C51] mt-2">Estás {position}° de la lista de espera</span>
            <ButtonComponent className="self-center my-6 font-medium" text="Darme de baja de la lista" size="large" variant={"mainLight"} />
          </div>
        )}
      </div>
    </>
  );
}