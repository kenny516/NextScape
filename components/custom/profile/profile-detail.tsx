"use client"
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react'

export function ProfileDetail() {
    const { data: session } = useSession();
    return (
        <div className='w-full h-full m-auto '>
            <Head>
                <title>profile</title>
            </Head>
            <div className='h-1/4 flex flex-col items-center border-4  border-e-red-50 '>
                <h1>Profile</h1>
                <div>
                    <Image className='rounded-full' src={session?.user?.image ?? 'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png'} alt='avatar' width={100} height={100} />
                </div>
                <Badge variant={'default'}>{session?.user?.email}</Badge>
                <p>{session?.user?.name}</p>
            </div>
        </div>
    )
}
