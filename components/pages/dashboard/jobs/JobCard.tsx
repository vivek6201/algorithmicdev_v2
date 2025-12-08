import { ExternalJob } from "@/types/job"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { Building2, MapPin, Banknote, Clock, CalendarDays, Share2, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface JobCardProps {
    job: ExternalJob
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <Card className="group transition-all hover:shadow-lg hover:border-primary/20 relative overflow-hidden">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                            <span className="text-xl font-bold text-primary">{job.company_name.charAt(0)}</span>
                        </div>
                        <div className="">
                            <h3 className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">
                                <Link href={`/jobs/other/${job.slug}`} className="focus:underline outline-none">
                                    {job.title}
                                </Link>
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                                <Building2 className="h-3.5 w-3.5" />
                                <span className="font-medium">{job.company_name}</span>
                                <span>•</span>
                                <span className="text-xs">{job.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-normal bg-primary/5 text-primary border-primary/20">
                            {job.job_type.replace("_", " ")}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {/* Tags */}
                {job.categories && job.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {job.categories.map((cat, i) => (
                            <Badge key={i} variant="secondary" className="font-normal text-xs bg-muted/50 text-muted-foreground hover:bg-muted">
                                {cat.name}
                            </Badge>
                        ))}
                    </div>
                )}
                {(!job.categories || job.categories.length === 0) && (
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="font-normal text-xs bg-muted/50 text-muted-foreground hover:bg-muted">Engineering</Badge>
                        <Badge variant="secondary" className="font-normal text-xs bg-muted/50 text-muted-foreground hover:bg-muted">Product</Badge>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border/50">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Banknote className="h-3.5 w-3.5" />
                            <span>Salary</span>
                        </div>
                        <p className="font-semibold text-sm">
                            {(job.min_salary > 0 || job.max_salary > 0)
                                ? `${formatCurrency(job.min_salary)} - ${formatCurrency(job.max_salary)}`
                                : "Not disclosed"}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Duration</span>
                        </div>
                        <p className="font-semibold text-sm">Full Time</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>Mode</span>
                        </div>
                        <p className="font-semibold text-sm">Office</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />
                            <span>Posted</span>
                        </div>
                        <p className="font-semibold text-sm">{new Date(job.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Apply by 30th Dec • Posted just now</p>
                <Button size="sm" asChild>
                    <Link href={`/jobs/other/${job.slug}`} target="_blank" rel="noopener noreferrer">
                        Apply Now
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
