import { getDoctorById } from '@/actions/doctors/doctorActions'
import { redirect } from 'next/navigation'
import { BackButton, CalendarPatients } from '@/components'
import Image from 'next/image'
import { cookies } from 'next/headers'

export const revalidate = 0

export default async function AppointmentById({ params, searchParams }: { params: { id: string }, searchParams: { reschedule?: string, appointmentId?: string } }) {
  const isReschedule = searchParams.reschedule === 'true';
  const appointmentId = searchParams.appointmentId;
  const id = Number(params.id.split('?')[0]);
  const doctor = await getDoctorById(id)
  const userCookie = cookies().get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : {};

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
              {doctor.img && doctor.img !== 'string' ? (
                <Image
                  src={doctor.img}
                  fill
                  sizes="(max-width: 768px) 100px"
                  alt={doctor.name + " doctor image"}
                  className="object-cover"
                  priority
                />
              ) : (
                <Image
                  src="https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png"
                  fill
                  sizes="(max-width: 768px) 100px"
                  alt={doctor.name + " default doctor image"}
                  className="object-cover"
                />
              )}
            </figure>
            <div>
              <h3 className='text-xl font-medium '>{doctor.name}</h3>
              <span className='text-[#505256] font-bold'>{doctor.specialization}</span>

              <p className="mt-2">Clínica colón - jujuy 2176</p>
            </div>
          </div>

        </div>

        {/*         <div>
          <div className="bg-zinc-200 p-6 rounded-lg">
            <h2 className="font-bold">Primer turno disponible</h2>
            <p>Martes 12 de Noviembre <span className="font-bold">14:00hs</span></p>
          </div>
        </div> */}
      </div>

      <CalendarPatients reschedule={isReschedule} doctor={{ id: doctor.id, name: doctor.name }} user={user} appointmentId={Number(appointmentId)} />

    </div>
  )
}