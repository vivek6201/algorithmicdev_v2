import { lazyLoad } from "@/lib/lazy";

const JobList = lazyLoad<{ fetchFor: string }>(() => import("@/components/pages/dashboard/jobs/job-list"))

export default function page() {
    return (
        <JobList fetchFor="other" />
    )
}
