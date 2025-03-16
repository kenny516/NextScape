'use client';

import type React from "react"
import { Settings, User, HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "./log-out-btn"
import { useSession } from "@/hooks/useSession";

interface MenuItem {
    label: string
    icon: React.ReactNode
    href: string
}

const menuItems: MenuItem[] = [
    { label: "Account", icon: <User className="w-4 h-4" />, href: "/content/back-office/settings/profile" },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, href: "#settings" },
    { label: "Help", icon: <HelpCircle className="w-4 h-4" />, href: "#help" },
]

export function ProfileMenu() {
    const { user } = useSession();

    return (
        <Card className="w-full max-w-sm sm:max-w-md mx-auto shadow-lg">
            <CardHeader className="relative pb-0">
                <div className="flex flex-col items-center">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={user?.image || undefined} alt={user?.name || undefined} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-lg sm:text-xl font-bold text-center">{user?.name}</h2>
                    <p className="text-sm text-muted-foreground text-center break-all">{user?.email}</p>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <Separator className="my-4" />
                <nav className="space-y-1 sm:space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                    ))}
                </nav>
            </CardContent>
            <CardFooter>
                <LogoutButton />
            </CardFooter>
        </Card>
    )
}

