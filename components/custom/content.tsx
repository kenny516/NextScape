import React from 'react'
import Header from './header'
import { BreadcrumbItem } from '@/types'
interface ContentLayoutProps {
    children: React.ReactNode;
    breadcrumbs: BreadcrumbItem[];
}

export default function Content({ children, breadcrumbs }: ContentLayoutProps) {
    return (
        <div className='h-full w-full flex flex-col'>
            <Header breadcrumbs={breadcrumbs} />
            <div className="flex-1 w-full h-full overflow-auto p-2">
                <div className='bg-sidebar w-full h-full rounded-lg p-2'>
                    {children}
                </div>
            </div>
        </div>
    )
}
