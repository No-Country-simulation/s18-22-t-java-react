import { getDoctorById } from '@/actions/doctors/doctorActions'
import { CalendarDemo } from '@/components/CalendarDemo'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function AppointmentById({ params }: { params: { id: string } }) {
  const id = Number(params.id)

  const doctor = await getDoctorById(id)


  if (!doctor) {
    redirect("/dashboard")
  }

  return (
    <div className=" max-w-[1400px] mx-auto px-6 py-10">
      <div className="flex justify-between">
        <div>
          <h2 className="mb-6 text-2xl">Selecciona un turno</h2>
          <div className="flex gap-8">

            <figure className='relative size-20 rounded-full overflow-hidden'>
              <Image src={doctor.img} fill sizes='(max-width: 728px) 100px' alt='' />
            </figure>
            <div>
              <h3>{doctor.name}</h3>
              <span>{doctor.specialization}</span>

              <p className="mt-2">Clínica colón - jujuy 2176</p>
            </div>
          </div>

        </div>

        <div>
          <div className="bg-zinc-200 p-6 rounded-lg">
            <h2 className="font-bold">Primer turno disponible</h2>
            <p>Martes 22 de Octubre <span className="font-bold">14:00hs</span></p>
          </div>
        </div>
      </div>

      <CalendarDemo />

    </div>
  )
}