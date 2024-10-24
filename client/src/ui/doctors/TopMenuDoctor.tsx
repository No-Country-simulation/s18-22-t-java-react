import { SvgCalendar, SvgNotifications, SvgPerfil } from '@/components'
import Link from 'next/link'
import React from 'react'

export function TopMenuDoctor() {

    const icons = [{ icon: <SvgCalendar />, title: "Mi agenda" }, { icon: <SvgPerfil />, title: "Mi perfil" }, { icon: <SvgNotifications />, name: "notificación" }]


    return (
        <div className="py-8">
            <nav className="flex justify-between items-center px-20 mx-auto text-[#004784]">
                <Link href={"/dashboard"} className="text-3xl font-semibold" >Logo policonsultorios</Link>
                <div>
                    <ul className="flex gap-8 items-center">
                        {
                            icons.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        className={`flex gap-2 justify-center items-center ${item.name && "bg-blue-500  p-2 rounded-full"}`}
                                        href={"#"}>
                                        <span>{item.icon}</span> {item.title && <span>{item.title}</span>}
                                    </Link>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </nav>
        </div>
    )
}
