"use client"

import { lazyLoad } from "@/lib/lazy";

const Footer = lazyLoad(() => import("@/components/pages/essential/footer"));
const Header = lazyLoad(() => import("@/components/pages/essential/header"));

function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout