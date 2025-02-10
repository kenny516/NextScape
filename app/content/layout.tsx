"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { User } from "@/types";
import { ReactNode, useState } from "react"

interface ContentLayoutProps {
    children: ReactNode
}

export default function ContentLayout({ children }: ContentLayoutProps) {
    const [user, setUser] = useState<User>();
    const userFake: User = {
        id: "1",
        name: "John Doe",
        email: "john@gmail.com",
        avatar: "https://randomuser"
    }

    return (
        <SidebarProvider>
            {userFake && <AppSidebar user={userFake} />}
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
