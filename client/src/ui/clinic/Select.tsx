import { SvgChevronDown } from "@/components";
import { listSpecialists } from "@/utils/helpers/listSpecialists";
import Link from "next/link";

export function Select() {
    return (
        <div className="grid grid-cols-2 max-w-[1100px] gap-4 my-10">
            {
                listSpecialists.map(item => (
                    <div key={item.title}>
                        <div className="flex justify-between items-center bg-[#ECF6FF] px-3 py-1 rounded-md cursor-pointer">
                            <h2 className="text-2xl">{item.title}</h2>
                            <SvgChevronDown />
                        </div>

                        <div className="mt-2 rounded-xl overflow-hidden shadow-list-select">
                            {
                                item.specialists.map((doctor, index) => (
                                    <div key={index} className="flex gap-3 px-3 py-6 shadow-list-select">
                                        <div>
                                            <h3 className="text-2xl leading-none">{doctor.name}</h3>
                                            <span className="font-bold">{doctor.specialty}</span>

                                            <p className="mt-5">{doctor.date}</p>
                                        </div>

                                        <Link href={"#"} className="self-center grow flex justify-center">
                                            <button className="bg-[#025DAB] text-white px-4 py-3 font-semibold rounded-lg ">Ver agenda</button>
                                        </Link>

                                    </div>
                                ))
                            }
                        </div>

                    </div>
                ))
            }



        </div>
    )
}
