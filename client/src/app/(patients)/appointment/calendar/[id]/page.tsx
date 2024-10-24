import { getDoctorById } from '@/actions/doctors/doctorActions'
import { CalendarDemo } from '@/components/CalendarDemo'
import { redirect } from 'next/navigation'
import { BackButton } from '@/components'
import Image from 'next/image'

export default async function AppointmentById({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const doctor = await getDoctorById(id)

  if (!doctor) {
    redirect("/dashboard")
  }

  return (
    <div className="w-[1200px] mx-auto px-6 pt-2 pb-20 relative">
      <BackButton className='-left-12' />
      <div className="flex justify-between mt-10">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Selecciona un turno:</h2>
          <div className="flex gap-8">

            {/* DESCRIPTION DOCTOR  */}
            <figure className='relative size-20 rounded-full overflow-hidden'>
              <Image src={doctor.img} fill sizes='(max-width: 728px) 100px' alt='doctor' priority />
            </figure>
            <div>
              <h3 className='text-xl font-medium '>{doctor.name}</h3>
              <span className='text-[#505256] font-bold'>{doctor.specialization}</span>

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

      <CalendarDemo doctor={{ id: doctor.id, name: doctor.name }} />

    </div>
  )
}