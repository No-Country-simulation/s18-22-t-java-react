import { SvgHome, SvgNotifications } from "@/components";
import { SvgPerfil } from "@/components/svg/svgs";
import Link from "next/link";

export function TopMenu() {
    const icons = [{ icon: <SvgPerfil />, title: "Mi perfil", url: '/profile/181' }, { icon: <SvgHome />, title: "Inicio", url: '/dashboard' }, { icon: <SvgNotifications />, name: "notificación", url: '#' }]

    return (
        <div className="py-8">
            <nav className="flex justify-between items-center px-20 mx-auto text-[#004784]">
                <Link href={"/dashboard"} className="text-3xl font-semibold" >Logo policonsultorios</Link>
                <div>
                    <ul className="flex gap-8 items-center">
                        <li >
                            <Link
                                className="border-2 border-[#004784] rounded-full px-6 py-2 font-semibold"
                                href={"/dashboard/appointments"}>Mis turnos</Link>
                        </li>
                        <li >
                            <Link
                                className="border-2 border-[#004784] rounded-full px-6 py-2 font-semibold"
                                href={"/appointment"}>Reservar turno</Link>
                        </li>

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
