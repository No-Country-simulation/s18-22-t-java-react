'use client'

import { SvgChevronDown } from "@/components";
import { DoctorFromResponse } from "@/interfaces/user";
import Link from "next/link";

import { useState } from "react";
interface Props {
    specializationList: { specialization: string, doctors: DoctorFromResponse[] }[];
}

export function Select({ specializationList, }: Props) {
    const [openIndices, setOpenIndices] = useState<number[]>([]);

    const toggleOpen = (index: number) => {
        setOpenIndices(prevIndices =>
            prevIndices.includes(index)
                ? prevIndices.filter(i => i !== index)
                : [...prevIndices, index]
        );
    };

    return (
        <div className="grid grid-cols-2 max-w-[1100px] gap-4 my-10">
            {specializationList.map((item, index) => (
                <div key={item.specialization}>
                    <div
                        className="flex justify-between items-center bg-[#ECF6FF] px-3 py-1 rounded-md cursor-pointer"
                        onClick={() => toggleOpen(index)}
                    >
                        <h2 className="text-2xl font-medium">{item.specialization}</h2>
                        <SvgChevronDown />
                    </div>

                    {openIndices.includes(index) && (
                        <div className="mt-2 rounded-xl overflow-hidden shadow-2xl">
                            {item.doctors.map((doctor: DoctorFromResponse) => (
                                <div key={doctor.id} className="flex gap-3 px-3 py-6 border-b-2">
                                    <div>
                                        <h3 className="text-[22px] font-medium leading-none">{doctor.name}</h3>
                                        <span className="text-base font-medium">{doctor.specialization}</span>
                                        <p className="text-base mt-5">Proximo turno disponible: 20/11 - 14:00hs</p>
                                    </div>
                                    <Link href={'/appointment/calendar/' + doctor.id} className="self-center grow flex justify-center">
                                        <button className="bg-[#025DAB] text-white text-lg px-6 py-4 font-medium rounded-xl w-40 h-16">
                                            Ver agenda
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
