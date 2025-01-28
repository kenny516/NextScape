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

    // some code to fetch the user

    return (
        <SidebarProvider>
            {user && <AppSidebar user={user} />}
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
