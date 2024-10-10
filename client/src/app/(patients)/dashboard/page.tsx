
export default function DashboardPage() {
    return (
        <div className="max-w-[1400px] mx-auto px-10 my-16">
            <div className="grid grid-cols-2 gap-10">

                {/* TURNO  */}
                <div >
                    <h2 className="">Bienvenida, Mica!</h2>

                    <form className="flex flex-col gap-2 max-w-[500px] my-10">

                        <h3>Próximos turnos</h3>

                        <input className="bg-gray-300 p-2" type="text" />
                        <input className="bg-gray-300 p-2" type="text" />
                        <button className="border max-w-max self-end px-2 py-1">Mis turnos</button>
                    </form>

                    <button className="bg-gray-300 py-5 px-24">Reserva un turno</button>

                </div>

                {/* RECOMENDACIONES */}
                <div className="max-w-[500px] justify-self-center w-full space-y-8">
                    <div className="grid place-content-center text-center bg-gray-200 h-[150px]">
                        <p>Recomendaciones de consulta de rutina <br />ej: chequeo anual</p>
                    </div>

                    <div className="grid place-content-center text-center bg-gray-200 h-[150px]">
                        <p>Recomendaciones de consulta de rutina <br />ej: chequeo anual</p>
                    </div>
                </div>

            </div>
        </div>
    );
}