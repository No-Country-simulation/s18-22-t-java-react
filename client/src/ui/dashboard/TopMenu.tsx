import { SvgHome, SvgNotifications } from "@/components";
import { SvgPerfil } from "@/components/svg/svgs";
import Link from "next/link";

export function TopMenu() {
    const icons = [{ icon: <SvgPerfil /> }, { icon: <SvgHome /> }, { icon: <SvgNotifications /> }]

    return (
        <div className="py-8">
            <nav className="flex justify-between items-center px-20 mx-auto text-[#004784]">
                <Link href={"/dashboard"} className="text-3xl font-semibold" >Logo policonsultorios</Link>
                <div>
                    <ul className="flex gap-8 items-center">
                        <li >
                            <Link
                                className="border-2 border-[#004784] rounded-full px-6 py-2 font-semibold"
                                href={"/calendar"}>Mis turnos</Link>
                        </li>
                        {
                            icons.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        className=" bg-[#C3C3C3] flex justify-center items-center p-2 rounded-full"
                                        href={"#"}>
                                        {item.icon}
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
