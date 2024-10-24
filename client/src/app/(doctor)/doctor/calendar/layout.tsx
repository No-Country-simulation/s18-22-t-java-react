import { TopMenuDoctor } from "@/ui";

export default function DoctorLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <TopMenuDoctor />
            {children}
        </div>
    );
}