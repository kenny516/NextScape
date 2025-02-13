"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { ReactNode } from "react";

interface ContentLayoutProps {
    children: ReactNode
}

export default function ContentLayout({ children }: ContentLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="h-full w-full">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
