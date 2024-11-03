import { SvgCalendar, SvgNotifications, SvgPerfil } from '@/components'
import Link from 'next/link'
import React from 'react'
import Logo from '/public/logo_full.png'
import Image from 'next/image'
import { DoctorFromResponse } from '@/interfaces/user'

export function TopMenuDoctor({ user }: { user: DoctorFromResponse }) {

    const icons = [{ icon: <SvgCalendar />, title: "Mi agenda", url: '/doctor/schedule' }, { icon: <SvgPerfil />, title: "Mi perfil", url: '/doctor/profile/' + user.id }, { icon: <SvgNotifications />, name: "notificación", url: '#' }]


    return (
        <div className="py-8">
            <nav className="flex justify-between items-center px-20 mx-auto text-[#004784]">
                <Link href={"/doctor/calendar"} className="text-3xl font-semibold" >
                    <Image src={Logo} alt="logo" width={250} height={50} priority />
                </Link>
                <div>
                    <ul className="flex gap-8 items-center">
                        {
                            icons.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        className={`flex gap-2 justify-center items-center ${item.name && "bg-blue-500  p-2 rounded-full"}`}
                                        href={item.url}>
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
