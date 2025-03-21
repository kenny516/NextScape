import ChartLine from '@/components/back-office/chart/chart-line';
import Content from '@/components/custom/content';
import { BreadcrumbItem } from '@/types';

export default function Page() {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '/' }
    ];

    return (
        <Content breadcrumbs={breadcrumbs}>
            <div className='size-1/2'>
                <ChartLine />
            </div>
        </Content>

    )
}
