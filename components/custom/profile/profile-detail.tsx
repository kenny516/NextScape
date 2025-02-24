"use client"
import { useUserStore } from '@/stores/useUserStore'
import Image from 'next/image';
import React from 'react'

export function ProfileDetail() {
    const { user } = useUserStore();
    console.log({ user });
    return (
        <div className='bg-yellow-900 w-1/2 h-full flex flex-col items-center m-auto'>
            <div>
                <Image className='rounded-full' src={user?.image ?? 'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png'} alt='avatar' width={100} height={100} />
            </div>
        </div>
    )
}
