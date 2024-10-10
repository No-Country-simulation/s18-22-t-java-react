
export function TopMenu() {
    return (
        <div className="bg-gray-300 py-4">
            <div className="flex justify-between items-center max-w-[1600px] px-4 mx-auto">
                <div className="border border-gray-500 px-20 py-2">
                    <span className="">Logo</span>
                </div>

                <nav>
                    <ul className="flex gap-8">
                        <li>Mis turnos</li>
                        <li>Perfil</li>
                        <li>Notificaciones</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
