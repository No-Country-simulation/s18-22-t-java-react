import Link from "next/link";
import { ButtonComponent } from "@/ui";
import Logo from '/public/logo_full.png'
import Image from "next/image";


export function Header() {

  return (

    <header className="flex justify-between items-center py-11 px-24 border-b-[6px] border-b-[#004784]">

      <Link href={"/dashboard"} className="text-lg font-bold">
        <Image src={Logo} alt="logo" width={250} height={50} />
      </Link>

      <nav>
        <ul className="flex gap-8 items-center">
          <li className="flex gap-[30px]" >
            <Link
              className=""
              href={"/auth/login"}>
              <ButtonComponent size="normal" text="Iniciar sesión" variant="light" />
            </Link>
            <Link
              className=""
              href={"/auth/register"}>
              <ButtonComponent size="normal" text="Registrarse" variant="dark" />
            </Link>
          </li>
        </ul>
      </nav>

    </header>
  )
}
