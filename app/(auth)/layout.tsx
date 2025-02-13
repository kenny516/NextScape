import { ModeToggle } from '@/components/theme/toggle-theme'
import { Toaster } from '@/components/ui/toaster'
import { ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className='relative min-h-svh w-full'>
            <div className='absolute right-4 top-4 z-10'>
                <ModeToggle />
            </div>
            {children}
            <Toaster />
        </div>
    )
}
