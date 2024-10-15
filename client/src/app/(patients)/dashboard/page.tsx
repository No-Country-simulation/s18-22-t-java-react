export default function DashboardPage() {

    return (
        <div className="max-w-[1400px] mx-auto px-10 my-16">

            <h2 className="text-2xl font-semibold">Te damos la bienvenida Mica!</h2>

            <div className="flex flex-col gap-2 my-10">
                <h3>Tus turnos ya agendados:</h3>

                {/* RESERVA DE CITAS  */}
                {Array.from({ length: 2 }).map((item, index) => (
                    <div key={index} className="flex gap-4 items-center bg-gray-100 p-4 max-w-max">
                        <div className="size-20 shrink-0 rounded-full bg-gray-300" />

                        <div className="shrink-0">
                            <h2>Dermatología</h2>
                            <span >Dra. Mónica Gonzalez</span>

                            <p className="mt-2">24/10/224</p>
                            <p>Clínica Pueyrredón - Jujuy 2176 </p>
                        </div>

                        <button className="bg-zinc-400/70 px-8 py-2 rounded-md ml-10">Cancelar</button>
                        <button className="bg-zinc-400/70 px-8 py-2 rounded-md">Reprogramar</button>

                    </div>
                ))}
            </div>

            <Link href={"/calendar"}><button className="bg-gray-300 py-5 px-24">Reserva un turno</button></Link>


        </div>
    );
}