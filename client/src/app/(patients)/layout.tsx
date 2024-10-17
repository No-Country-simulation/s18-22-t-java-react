import { TopMenu } from "@/ui";

export default function LayoutDashboard({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <TopMenu />

            {children}

        </div>
    );
}