import { BackButton } from "@/components";
import { DoctorCard } from "@/ui";


export default function SpecialtyPage() {

    const images = ["/images/doctors/img1.jpg", "/images/doctors/img2.jpg", "/images/doctors/img3.jpg", "/images/doctors/img4.jpg", "/images/doctors/img5.jpg", "/images/doctors/img6.jpg", "/images/doctors/img7.jpg"]

    return (
        <div className="max-w-[1200px] mx-auto ms-[240px] px-4">
            <BackButton />
            <div className="max-w-[900px]">
                <h1 className="text-[32px] font-medium text-[#1A2C33]">Traumatología</h1>

                <div className="my-8 flex flex-col gap-6">
                    {
                        images.map(item => (
                            <DoctorCard key={item} name="Dra. Mónica Gonzalez" img={item} speciality="Traumatología" place="Clínica Colón" />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}