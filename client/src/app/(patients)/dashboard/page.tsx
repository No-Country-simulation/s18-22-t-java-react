import { DoctorCard } from "@/ui";

export default function DashboardPage() {

    const doctorList = [
        {
            "id": 1,
            "name": "Dr. Ignacio López",
            "password": "ignacio123",
            "email": "ignacio.lopez@example.com",
            "phone": "1123456789",
            "img": "https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png",
            "active": true,
            "specialization": "Cardiología",
            "licenseNumber": "MP123456"
        },
        {
            "id": 2,
            "name": "Dra. Valeria González",
            "password": "valeria321",
            "email": "valeria.gonzalez@example.com",
            "phone": "1198765432",
            "img": "https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png",
            "active": true,
            "specialization": "Pediatría",
            "licenseNumber": "MP654321"
        },]

    return (
        <div className="max-w-[1400px] mx-auto px-10 my-16">

            <h2 className="text-6xl font-medium text-secondaryBlue-500">Te damos la bienvenida Mica!</h2>

            <div className="flex flex-col gap-2 my-10">
                <h3 className="text-[32px] text-[#1A2C33] mb-10">Tus turnos ya agendados:</h3>

                {/* RESERVA DE CITAS  */}
                {doctorList.map((item, index) => (
                    <DoctorCard dashboard id={item.id} img={item.img} key={index} name={item.specialization} speciality={item.name} place="Clinica Pueyrredón - Jujuy 2176" />
                ))}
            </div>

        </div>
    );
}