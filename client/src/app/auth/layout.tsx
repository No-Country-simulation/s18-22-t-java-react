import { Header } from "@/ui";

export default function LayoutAuth({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}