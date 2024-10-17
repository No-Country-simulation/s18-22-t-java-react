import { Header } from "@/ui";

export default function LayoutAuth({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}