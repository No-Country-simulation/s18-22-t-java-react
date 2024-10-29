import { getAllAppointmentById_Patient } from "@/actions/appointment-action";
import { AppointmentWithDoctor } from "@/interfaces/appointment";
import { DoctorCard } from "@/ui";

export default async function DashboardPage() {

    // const doctorList = [
    //     {
    //         "id": 1,
    //         "name": "Dr. Ignacio López",
    //         "password": "ignacio123",
    //         "email": "ignacio.lopez@example.com",
    //         "phone": "1123456789",
    //         "img": "https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png",
    //         "active": true,
    //         "specialization": "Cardiología",
    //         "licenseNumber": "MP123456"
    //     },
    //     {
    //         "id": 3,
    //         "name": "Dra. Valeria González",
    //         "password": "valeria321",
    //         "email": "valeria.gonzalez@example.com",
    //         "phone": "1198765432",
    //         "img": "https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png",
    //         "active": true,
    //         "specialization": "Pediatría",
    //         "licenseNumber": "MP654321"
    //     },]

    const allAppointment: AppointmentWithDoctor[] = await getAllAppointmentById_Patient(26)
    const filterAppointment = allAppointment.filter(item => item.status === "PROGRAMADA")

    return (
        <div className="max-w-[1200px] mx-auto px-10 my-16">

            <h2 className="text-6xl font-medium text-secondaryBlue-500">Te damos la bienvenida Mica!</h2>

            <div className="flex flex-col gap-2 my-10">
                <h3 className="text-[32px] text-[#1A2C33] mb-10">Tus turnos ya agendados:</h3>

                {/* RESERVA DE CITAS  */}
                {
                    filterAppointment.length === 0 ? (
                        <div className="bg-[#F6F7F7] max-w-[800px] px-4 py-6 rounded-lg">
                            <p>Aún no tenes ningún turno agendado.</p>
                        </div>
                    ) : (
                        filterAppointment.map((item, index) => (
                            <DoctorCard
                                place="Clinica Pueyrredón - Jujuy 2176"
                                name={item.doctor.specialization}
                                specialty={item.doctor.name}
                                startTime={item.startTime}
                                id_appointment={item.id}
                                img={item.doctor.img}
                                id_doctor={item.id}
                                date={item.date}
                                key={index}
                                dashboard
                            />
                        ))
                    )
                }
            </div>

        </div>
    );
}