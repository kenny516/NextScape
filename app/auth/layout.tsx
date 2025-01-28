import { ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-6 p-8 border rounded-lg shadow-sm bg-card text-card-foreground">
                <div className="relative">
                    {children}
                </div>
            </div>
        </div>
    )
}
