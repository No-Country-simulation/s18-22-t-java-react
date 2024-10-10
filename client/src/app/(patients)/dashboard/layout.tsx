import { TopMenu } from "@/ui";

export default function LayoutDashboard({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <TopMenu />
            {children}
        </div>
    );
}