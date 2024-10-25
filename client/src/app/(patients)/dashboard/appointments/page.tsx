import { DoctorCard, WaitList } from "@/ui";

export default function DashboardAppointmentPage() {
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
      "id": 3,
      "name": "Dra. Valeria González",
      "password": "valeria321",
      "email": "valeria.gonzalez@example.com",
      "phone": "1198765432",
      "img": "https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/pzwqefrzmvppfjctdpig.png",
      "active": true,
      "specialization": "Pediatría",
      "licenseNumber": "MP654321"
    },]

  const waitList = {
    name: "Dra. Mónica Gonzalez",
    specialization: "Traumatología",
    date: "28/10/2024",
    establishment: "Clinica Pueyrredón - Jujuy 2176",
    startTime: "15:20",
    position: 2
  }

  return (
    <div className="flex gap-40 mx-auto px-10 my-16 text-[#1A2C33]">
      <div>
        <h2 className="text-[32px] font-medium">Revisá y gestioná tus turnos</h2>

        <div className="flex flex-col gap-2 my-10">
          <h3 className="text-2xl font-medium mb-10">Tus turnos ya agendados:</h3>

          {/* RESERVA DE CITAS  */}
          {doctorList.map((item, index) => (
            <DoctorCard dashboard id={item.id} img={item.img} key={index} name={item.specialization} speciality={item.name} place="Clinica Pueyrredón - Jujuy 2176" />
          ))}
        </div>

      </div>
      <div className="flex flex-col justify-center mt-12">
        <WaitList confirmWaitList={false} waitList={waitList} />
      </div>
    </div>
  );
}