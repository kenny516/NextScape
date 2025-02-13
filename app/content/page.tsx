"use client"
import Header from '@/components/custom/header'
import { ModeToggle } from '@/components/theme/toggle-theme'
import { useSession } from 'next-auth/react';

export default function Page() {
    const { data: session } = useSession();

    if (session) {
        console.log("Session:", session);
    } else {
        console.log("No session found.");
    }
    return (
        <>
            <Header titre="page" />
            <ModeToggle />
            <div>page</div>
        </>
    )
}
