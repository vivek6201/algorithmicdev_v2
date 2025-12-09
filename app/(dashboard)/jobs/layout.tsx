// import JobSidebar from "@/components/pages/dashboard/jobs/sidebar";
// will work on this once app is ready and have some traffic

export default function JobsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full flex flex-col md:flex-row overflow-hidden bg-background">
            {/* <aside className="w-full md:w-64 shrink-0 h-full overflow-y-auto">
                <JobSidebar />
            </aside> */}
            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
