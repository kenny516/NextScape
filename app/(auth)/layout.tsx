import { ThemeToggle } from '@/components/theme/toggle-theme'
import { ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className='relative min-h-svh w-full'>
            <div className='absolute right-4 top-4 z-10'>
                <ThemeToggle />
            </div>
            {children}
        </div>
    )
}
