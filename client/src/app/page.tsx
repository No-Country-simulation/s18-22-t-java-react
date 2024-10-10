
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        {/* Navbar */}
        <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
          <div className="text-lg font-bold">Logo</div>
          <div className="space-x-4">
            {/* Enlace a Registrarse */}
            <Link href="/auth/register">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
                Registrarse
              </button>
            </Link>
            {/* Enlace a Iniciar Sesión */}
            <Link href="/auth/login">
              <button className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </nav>

        {/* Slider */}
        <header className="w-full">
          <div className="relative w-full h-64 overflow-hidden">
            <div className="flex transition-transform ease-out duration-500">
              {/* Imagen*/}
              <div className="min-w-full h-64 flex items-center justify-center">
                <img
                  src="https://hospital-clinic.com.mx/wp-content/uploads/2024/01/8.-Habitacion-2.jpg"
                  alt="Policonsultorio 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
          <p className="text-lg text-gray-600">Policonsultorio</p>
          <Link href={'/appointment'} className="text-lg text-gray-600">Agendar Cita</Link>
        </main>
      </div>
    </div>
  );
}
