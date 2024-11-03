import { TopMenuDoctor } from "@/ui";
import { cookies } from 'next/headers'

export default function LayoutDashboard({
  children
}: {
  children: React.ReactNode;
}) {
  const userCookie = cookies().get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : {};
  return (
    <div className="min-h-screen">
      <TopMenuDoctor user={user} />
      <div className="max-w-[1524px] mx-auto px-4 text-[#1A2C33]">
        {children}
      </div>
    </div>
  );
}