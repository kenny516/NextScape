"use client"
import Content from '@/components/custom/content';
import Header from '@/components/custom/header'
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

    useEffect(() => {
        if (session?.user && user === null) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session]);

    return (
        <Content breadcrumbs={breadcrumbs}>
            <div>
                coucou
            </div>
        </Content>

    )
}
