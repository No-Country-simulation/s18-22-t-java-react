import { DoctorCard } from "@/ui";


export default function SpecialtyPage() {

    const images = ["/images/doctors/img1.jpg", "/images/doctors/img2.jpg", "/images/doctors/img3.jpg", "/images/doctors/img4.jpg", "/images/doctors/img5.jpg", "/images/doctors/img6.jpg", "/images/doctors/img7.jpg"]

    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="max-w-[900px]">
                <h1 className="text-3xl">Traumatología</h1>

                <div className="my-8">
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