import { NavbarDoctors } from "@/ui";

export default function LayoutDashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <NavbarDoctors />
      <div className="max-w-[1200px] ms-[240px] px-4 text-[#1A2C33]">
        {children}
      </div>


    </div>
  );
}