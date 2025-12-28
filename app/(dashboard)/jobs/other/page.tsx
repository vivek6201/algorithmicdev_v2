import { lazyLoad } from "@/lib/lazy";

const JobList = lazyLoad<{ fetchFor: string }>(() => import("@/components/pages/dashboard/jobs/job-list"))

export const metadata = {
    title: "Jobs | AlgorithmicDev",
    description: "Find your next opportunity from our curated list of positions.",
}

export default function page() {
    return (
        <JobList fetchFor="other" />
    )
}
