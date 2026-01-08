import { fetchTutorialBySlug } from '@/lib/routes/tutorials'
import NodeCard from '@/components/pages/dashboard/tutorials/node-card'

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let tutorial;
    try {
        tutorial = await fetchTutorialBySlug(slug);

        if (!tutorial) {
            return <div className="p-12 text-center text-muted-foreground">Tutorial not found</div>
        }
    } catch (error) {
        console.error(error);
        return <div className="p-12 text-center text-muted-foreground">Tutorial not found</div>
    }

    return (
        <div className="flex flex-col gap-10 w-full">
            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <div className='flex flex-col gap-y-1 pl-4 border-l-2'>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        {tutorial.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed capitalize">
                        {tutorial.description}
                    </p>
                </div>
            </div>

            {/* Lessons Section - Full Width Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold tracking-tight">Syllabus</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tutorial.nodes?.length > 0 ? (
                        tutorial.nodes.map((node) => (
                            <NodeCard key={node.id} node={node} tutorialSlug={tutorial.slug} />
                        ))
                    ) : (
                        <div className="col-span-full p-8 text-center bg-muted/20 rounded-xl border border-dashed text-muted-foreground">
                            No lessons added yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page