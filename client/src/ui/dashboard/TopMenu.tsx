import { SvgHome, SvgNotifications } from "@/components";
import { SvgPerfil } from "@/components/svg/svgs";
import Link from "next/link";

export function TopMenu() {
    const icons = [{ icon: <SvgPerfil /> }, { icon: <SvgNotifications /> }, { icon: <SvgHome /> }]

    return (
        <div className="bg-[#D9D9D9] py-4">
            <div className="flex justify-between items-center max-w-[1600px] px-4 mx-auto">
                <div className="bg-[#C3C3C3] size-24 rounded-full flex justify-center items-center">
                    <Link href={"/dashboard"}  >Logo</Link>
                </div>

                <nav>
                    <ul className="flex gap-8 items-center">
                        <li >
                            <Link
                                className="border border-gray-500 px-4 py-1"
                                href={"#"}>Mis turnos</Link>
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
                </nav>
            </div>
        </div>
    )
}
