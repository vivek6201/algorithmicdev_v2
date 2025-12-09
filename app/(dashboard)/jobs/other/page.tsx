import JobList from "@/components/pages/dashboard/jobs/JobList";

export default function page() {
    return (
        <div className="min-h-screen">
            <JobList fetchFor="other" />
        </div>
    )
}
