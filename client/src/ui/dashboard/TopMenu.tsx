import { SvgHome, SvgNotifications } from "@/components";
import { SvgPerfil } from "@/components/svg/svgs";
import logo from "/public/images/logo.png"
import Image from "next/image";
import Link from "next/link";

export function TopMenu() {
    const icons = [{ icon: <SvgPerfil />, title: "Mi perfil" }, { icon: <SvgHome />, title: "Inicio" }, { icon: <SvgNotifications />, name: "notificación" }]

    return (
        <div className="py-8">
            <nav className="flex justify-between items-center px-20 mx-auto text-[#004784]">
                <Link href={"/dashboard"} className="text-3xl font-semibold" >
                    <Image src={logo} alt="logo" />
                </Link>
                <div>
                    <ul className="flex gap-8 items-center">
                        <li >
                            <Link
                                className="border-2 border-[#004784] rounded-full px-6 py-2 font-semibold"
                                href={"/dashboard"}>Mis turnos</Link>
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
