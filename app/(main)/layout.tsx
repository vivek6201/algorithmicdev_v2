"use client"

import Footer from "@/components/pages/essential/footer";
import Header from "@/components/pages/essential/header";

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