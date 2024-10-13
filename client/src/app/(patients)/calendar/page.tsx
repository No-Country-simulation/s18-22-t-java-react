import { CalendarDemo } from "@/components/calendar/Calendar";

export default function CalendarPage() {
    return (
        <div className=" max-w-[1400px] mx-auto px-6 py-10">
            <div className="flex justify-between">
                <div>
                    <h2 className="mb-6 text-2xl">Selecciona un turno</h2>
                    <div className="flex gap-8">
                        <div className=" size-20 bg-gray-300 rounded-full" />
                        <div>
                            <h3>Dra. Monica Gonzalez</h3>
                            <span>Dermatóloga</span>

                            <p className="mt-2">Clínica colón - jujuy 2176</p>
                        </div>
                    </div>

                </div>

                <div>
                    <div className="bg-zinc-200 p-6 rounded-lg">
                        <h2 className="font-bold">Primer turno disponible</h2>
                        <p>Martes 22 de Octubre <span className="font-bold">14:00hs</span></p>
                    </div>
                </div>
            </div>

            <CalendarDemo />

        </div>
    );
}