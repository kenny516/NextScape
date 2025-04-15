import { Content } from "@/components/custom/content";
import { Skeleton } from "@/components/ui/skeleton";
import { BreadcrumbItem } from "@/types";

export default function ProfileLoading() {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Setting', href: '/content/back-office/setting' },
        { label: 'Profile' },
    ];
    return (
        <Content breadcrumbs={breadcrumbs}>
            <div className='w-full max-w-3xl mx-auto py-8 px-4'>
                {/* En-tête de la carte */}
                <div className="overflow-hidden bg-card rounded-lg shadow">
                    <div className="relative h-32 bg-primary/50">
                        <div className="absolute -bottom-12 left-8">
                            <Skeleton className="h-[100px] w-[100px] rounded-full border-4 border-background shadow-lg" />
                        </div>
                    </div>

                    <div className="pt-16 px-8 pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <Skeleton className="h-8 w-48 mb-2" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <Skeleton className="h-5 w-5 rounded" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <Skeleton className="h-5 w-5 rounded" />
                                <Skeleton className="h-5 w-56" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}