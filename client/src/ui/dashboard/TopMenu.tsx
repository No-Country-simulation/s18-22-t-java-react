import Link from "next/link";

export function TopMenu() {
    return (
        <div className="bg-gray-300 py-8">
            <div className="flex justify-between items-center max-w-[1600px] px-4 mx-auto">
                <div >
                    <Link href={"/dashboard"} className="border border-gray-500 px-20 py-2" >Logo</Link>
                </div>

                <nav>
                    <ul className="flex gap-8">
                        <li>
                            <Link
                                className="border border-gray-500 px-4 py-1"
                                href={"calendar"}>Reservar turno</Link></li>
                        <li >
                            <Link
                                className="border border-gray-500 px-4 py-1"
                                href={"#"}>Mis turnos</Link>
                        </li>
                        <li >
                            <Link
                                className="border border-gray-500 px-4 py-1"
                                href={"#"}>Mi Perfil</Link>
                        </li>
                        <li>Notificaciones</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
