import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'
import { TopNav } from './top-nav';
import { BreadcrumbItem } from '@/types';


export default function Header({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex w-full items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <TopNav breadcrumbs={breadcrumbs} />
            </div>
        </header>
    )
}
