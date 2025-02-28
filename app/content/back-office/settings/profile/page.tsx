import Content from '@/components/custom/content';
import { ProfileDetail } from '@/components/custom/profile/profile-detail'
import { BreadcrumbItem } from '@/types';
import React from 'react'

export default function Page() {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Setting', href: '/content/back-office/setting' },
        { label: 'Profile' },
    ];
    return (
        <Content breadcrumbs={breadcrumbs}>
            <ProfileDetail />
        </Content>

    )
}




