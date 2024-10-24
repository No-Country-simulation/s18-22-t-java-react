import { TopMenuDoctor } from "@/ui";

export default function LayoutDashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopMenuDoctor />
      <div className="max-w-[1524px] mx-auto px-4 text-[#1A2C33]">
        {children}
      </div>
    </div>
  );
}