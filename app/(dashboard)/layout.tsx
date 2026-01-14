import { lazyLoad } from "@/lib/lazy";
import { sidebarItems } from "@/lib/utils/constants";
import type { SidebarItemType } from "@/components/pages/dashboard/sidebar";

const Header = lazyLoad(() => import("@/components/pages/dashboard/header"));
const Sidebar = lazyLoad<{ items: SidebarItemType[]; className?: string }>(() => import("@/components/pages/dashboard/sidebar"));
const MobileNav = lazyLoad(() => import("@/components/pages/dashboard/mobile-nav"));
const Footer = lazyLoad(() => import("@/components/pages/essential/footer"));

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