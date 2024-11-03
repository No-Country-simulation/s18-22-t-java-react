import { SvgHome, SvgNotifications } from "@/components";
import { SvgCalendar } from "@/components/svg/svgs";
import Link from "next/link";
import Logo from '/public/logo_full.png'
import Image from "next/image";

export function NavbarDoctors() {
  const icons = [{ icon: <SvgCalendar />, title: "Mi Agenda" }, { icon: <SvgHome />, title: "Inicio" }, { icon: <SvgNotifications />, name: "notificación" }]

  return (
    <div className="py-8">
      <nav className="flex justify-between items-center px-20 mx-auto text-[#004784]">
        <Link href={"/dashboard"} className="text-3xl font-semibold">
          <Image src={Logo} alt="logo" width={250} height={50} />
        </Link>
        <div>
          <ul className="flex gap-8 items-center">
            {
              icons.map((item, index) => (
                <li key={index}>
                  <Link
                    className={`flex gap-2 justify-center items-center ${item.name && "bg-blue-500  p-2 rounded-full"}`}
                    href={"#"}>
                    <span>{item.icon}</span> {item.title && <span>{item.title}</span>}
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
