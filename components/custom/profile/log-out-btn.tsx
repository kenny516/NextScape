"use client"
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {

    const handleLogout = async () => {
        try {
            await authClient.signOut();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center gap-2"
        >
            <Link href="/sign-in" className="flex items-center w-full">
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
            </Link>
        </Button>
    );
}