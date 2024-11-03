import imageClinic from "/public/image/clinic/clinic.png"
import { BackButton, SvgLocation, SvgPhone } from "@/components"
import Image from "next/image";
import { Select } from "@/ui";
import { getClinicById } from "@/actions/clinics/clinicActions";
import { Clinic } from "@/interfaces/clinic";
import { getAllSpecializationList } from "@/actions/doctors/doctorActions";
import { DoctorFromResponse } from "@/interfaces/user";

export default async function ClinicPage({ params }: { params: { id: string } }) {
    const id = Number(params.id)
    const data: Clinic | null = await getClinicById(id)
    const specializationList = (await getAllSpecializationList()).map(item => ({
        specialization: String(item.specialization),
        doctors: item.doctors as DoctorFromResponse[]
    }));

    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <BackButton />

            <div className="flex mt-14 gap-8 max-w-[824px] w-full">

                {/* IMAGE  */}
                <figure className="size-52 bg-[#D9D9D9] rounded-full shrink-0">
                    <Image
                        src={data?.vlinicImage ? data?.vlinicImage : imageClinic}
                        alt="hospital"
                        height={1000} width={1000}
                        className="size-52 rounded-full"
                    />

                </figure>

                <div>
                    <h2 className="text-4xl">{data?.name}</h2>
                    <div className="flex gap-1 my-4">
                        <SvgLocation /> <span className="mr-5">{data?.address}</span> <SvgPhone /> <span>{data?.phone}</span>
                    </div>

                    <p>
                        {data?.description}
                    </p>
                </div>
            </div>

            <Select specializationList={specializationList} />
        </div>
    );
}