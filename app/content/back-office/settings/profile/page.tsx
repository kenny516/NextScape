import Content from '@/components/custom/content';
import { ProfileDetail } from '@/components/custom/profile/profile-detail'
import { BreadcrumbItem } from '@/types';
import Head from 'next/head';
import React from 'react'

export default function Page() {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Setting', href: '/content/back-office/setting' },
        { label: 'Profile' },
    ];
    return (
        <Content breadcrumbs={breadcrumbs}>
            <Head>
                <title>profile</title>
            </Head>
            <ProfileDetail />
        </Content>

    )
}




