"use client"

import type React from "react"
import { Settings, LogOut, User, HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { signOut } from "next-auth/react"

interface MenuItem {
    label: string
    icon: React.ReactNode
    href: string
}

interface Profile01Props {
    name: string | null
    email: string | null
    avatar: string | null
    role: string | null
}

const defaultProfile = {
    name: "Eugene An",
    email: "eugene.an@example.com",
    avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
    role: "Prompt Engineer",
} satisfies Required<Profile01Props>

const menuItems: MenuItem[] = [
    { label: "Account", icon: <User className="w-4 h-4" />, href: "/content/back-office/settings/profile" },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, href: "#settings" },
    { label: "Help", icon: <HelpCircle className="w-4 h-4" />, href: "#help" },
]

export function ProfileMenu({
    name = defaultProfile.name,
    email = defaultProfile.email,
    avatar = defaultProfile.avatar,
    role = defaultProfile.role,
}: Partial<Profile01Props> = defaultProfile) {
    return (
        <Card className="w-full max-w-sm sm:max-w-md mx-auto shadow-lg">
            <CardHeader className="relative pb-0">
                <div className="flex flex-col items-center">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={avatar} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-lg sm:text-xl font-bold text-center">{name}</h2>
                    <p className="text-sm text-muted-foreground text-center break-all">{email}</p>
                    <Badge variant="secondary" className="mt-2">
                        {role}
                    </Badge>
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
                <Button variant="destructive" className="w-full" onClick={async () => {
                    await signOut({ callbackUrl: "/" });
                }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </CardFooter>
        </Card>
    )
}

