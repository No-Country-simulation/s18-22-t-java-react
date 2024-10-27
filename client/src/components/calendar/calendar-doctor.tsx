import { SvgChevronNew } from "../svg/svgs";
import { Calendar } from "../ui/calendar";

export function CalendarDoctor() {
    return (
        <div className="grid grid-cols-[60%_40%] gap-8 ">
            {/* CITAS  */}
            <div className="">
                <p>Miércoles 23 de Octubre</p>
                <span className="text-gray-500">Pacientes de hoy</span>

                <div className="mt-8">
                    {
                        Array.from({ length: 3 }).map((item, index) => (
                            <div key={index} className="p-7 flex justify-between items-center shadow-5xl rounded-xl mb-4">
                                <div className="font-bold">
                                    <h3><span className="text-blue-800">14:30</span> Ana Pérez</h3>
                                    <p className="font-normal">Clínica Pueyrredón - Jujuy 2176</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span>Historia clínica</span>
                                    <span className="flex items-center text-secondaryBlue-400 font-bold">Más información <SvgChevronNew /></span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* CALENDARIO  */}
            <div className="">
                <Calendar />
            </div>
        </div>
    )
}
