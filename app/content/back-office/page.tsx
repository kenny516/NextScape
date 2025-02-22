"use client"
import ChartLine from '@/components/back-office/chart/chart-line';
import Content from '@/components/custom/content';
import { useUserStore } from '@/stores/useUserStore';
import { BreadcrumbItem } from '@/types';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Page() {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Page' },
    ];

    const { data: session } = useSession();
    const { user, setUser } = useUserStore();
    console.log(session);
    useEffect(() => {
        if (session?.user && user === null) {
            setUser(session.user);
        }
    }, [session, setUser, user]);

    return (
        <Content breadcrumbs={breadcrumbs}>
            <div className='size-1/2'>
                <ChartLine />
            </div>
        </Content>

    )
}
