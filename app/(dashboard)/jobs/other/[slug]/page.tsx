import { fetchJobDetail } from "@/lib/routes/jobs";
import { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import JobHeaderActions from "@/components/pages/dashboard/jobs/job-header-actions";
import ContentRenderer from "@/components/pages/dashboard/content-renderer";

async function getData(slug: string) {
    const response = await fetchJobDetail(slug)
    return response
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const job = await getData(slug);

    if (!job) {
        return {
            title: "Job Not Found",
        }
    }

    const title = `${job.title} at ${job.company_name || 'Unknown Company'}`;
    const description = `Apply for the position of ${job.title} in ${job.location}. View job details, salary, and requirements.`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'article',
        }
    }
}

function formatSalary(amount: number) {
    if (!amount) return null;
    // Simple formatter if utils one is missing, or use Intl
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await getData(slug)

    if (!job) {
        return <div className="p-8 text-center">Job not found</div>;
    }

    return (
        <>
            {/* Redesigned Header - Flex container for Title/Info (Left) and Actions (Right) */}
            <div className="mb-8 flex flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-2 flex-1">
                    {/* Date */}
                    <div className="text-sm text-muted-foreground font-medium">
                        {formatDate(job.created_at)}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                        {job.company_name} is hiring for {job.title}
                    </h1>

                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="bg-foreground text-background hover:bg-foreground/90 px-2 py-1 rounded-full font-medium border-0">
                            <p className="text-xs capitalize">{job.job_type.replace(/_/g, ' ')}</p>
                        </div>

                        {(job.min_salary || job.max_salary) && (
                            <div className="flex items-center gap-1 bg-foreground/90 px-2 py-1 text-background hover:bg-foreground/90 rounded-full text-sm font-medium border-0">
                                <p className="text-xs">{job.min_salary ? formatSalary(job.min_salary) : ''}</p>
                                <p className="text-xs">{job.min_salary && job.max_salary ? ' - ' : ''}</p>
                                <p className="text-xs">{job.max_salary ? formatSalary(job.max_salary) : ''}</p>
                            </div>
                        )}

                        <div className="bg-foreground/90 px-2 py-1 text-background hover:bg-foreground/90 rounded-full text-sm font-medium border-0">
                            <p className="text-xs">{job.location}</p>
                        </div>
                    </div>
                </div>

                {/* Social Actions & Apply Button - Right side on desktop */}
                <div className="pt-2 lg:pt-8 lg:shrink-0">
                    <JobHeaderActions applyUrl={job.external_apply_url} />
                </div>
            </div>

            <ContentRenderer content={job.description} />
        </>
    )
}

export default page