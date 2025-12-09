import Header from "@/components/pages/dashboard/header";
import Sidebar from "@/components/pages/dashboard/sidebar";
import MobileNav from "@/components/pages/dashboard/MobileNav";
import { sidebarItems } from "@/lib/constants";
import Footer from "@/components/pages/essential/footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <div className="h-full flex w-full">
        <Sidebar items={sidebarItems} />
        <div className="w-full h-full flex flex-col overflow-y-auto pb-10 md:pb-0">
            <Header />
            <div className="flex-1 pb-16 md:pb-0">
                {children}
            </div>
            <Footer />
        </div>
        <MobileNav />
    </div>
}