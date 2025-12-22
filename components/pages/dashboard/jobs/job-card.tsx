import { ExternalJob } from "@/types/job"
import Link from "next/link"
import {
    Building2,
    Banknote,
    Clock,
    Briefcase,
    CalendarDays,
    Link2,
    ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface JobCardProps {
    job: ExternalJob
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/20 py-1! md:py-4!">
            {/* ------------ MOBILE LAYOUT ------------ */}
            <div className="md:hidden p-4 space-y-4">
                {/* Title + Company */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold leading-tight">
                            <Link
                                href={`/jobs/other/${job.slug}`}
                                className="hover:text-primary"
                                target="_blank"
                            >
                                {job.title}
                            </Link>
                        </h2>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Building2 className="h-3.5 w-3.5" />
                            {job.company_name} • {job.location}
                        </div>
                    </div>
                    <Button size="sm" asChild>
                        <span className="flex items-center gap-2">
                            <Link2 />
                            <Link href={`/jobs/other/${job.slug}`} target="_blank">
                                Apply
                            </Link>
                        </span>
                    </Button>
                </div>

                {/* Pills Row */}
                <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/10 text-primary text-xs">
                        {formatCurrency(job.min_salary)} - {formatCurrency(job.max_salary)}
                    </Badge>

                    <Badge variant="secondary" className="text-xs capitalize">
                        {job.job_type.replace("_", " ")}
                    </Badge>
                </div>

                {/* Footer */}
                <p className="text-xs text-muted-foreground">
                    Posted {new Date(job.created_at).toLocaleDateString()}
                </p>
            </div>

            {/* ------------ DESKTOP LAYOUT ------------ */}
            <div className="hidden md:block">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-center justify-between">
                            {/* Company Icon */}
                            <div className="h-12 w-12 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                                <span className="text-xl font-bold text-primary">
                                    {job.company_name.charAt(0)}
                                </span>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg hover:text-primary transition-colors">
                                    <Link href={`/jobs/other/${job.slug}`} target="_blank">
                                        {job.title}
                                    </Link>
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Building2 className="h-3.5 w-3.5" />
                                    <span className="font-medium">{job.company_name}</span>
                                    <span>•</span>
                                    <span className="text-xs">{job.location}</span>
                                </div>
                            </div>
                        </div>
                        <Button size="sm" asChild>
                            <Link href={`/jobs/other/${job.slug}`} target="_blank">
                                <ExternalLink className="ml-2 w-4 h-4" />
                                Apply Now
                            </Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-border/50 place-items-stretch">
                    <div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Banknote className="h-3.5 w-3.5" /> Salary
                        </div>
                        <p className="font-semibold text-sm">
                            {formatCurrency(job.min_salary)} -{" "}
                            {formatCurrency(job.max_salary)}
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" /> Duration
                        </div>
                        <p className="font-semibold text-sm">{job.job_type.replace("_", " ")}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Briefcase className="h-3.5 w-3.5" /> Mode
                        </div>
                        <p className="font-semibold text-sm">{job.job_mode.replace("_", " ")}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" /> Posted
                        </div>
                        <p className="font-semibold text-sm">
                            {new Date(job.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
