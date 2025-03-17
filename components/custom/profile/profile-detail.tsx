import { Badge } from '@/components/ui/badge';
import { getUser } from '@/lib/auth-session';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react'

export async function ProfileDetail() {
    const user = await getUser();
    return (
        <div className='w-full h-full m-auto '>
            <Head>
                <title>profile</title>
            </Head>
            <div className='h-1/4 flex flex-col items-center border-4  border-e-red-50 '>
                <h1>Profile</h1>
                <div>
                    <Image className='rounded-full' src={user?.image ?? 'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png'} alt='avatar' width={100} height={100} />
                </div>
                <Badge variant={'default'}>{user?.email}</Badge>
                <p>{user?.name}</p>
            </div>
        </div>
    )
}
