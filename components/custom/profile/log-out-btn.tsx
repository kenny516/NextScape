'use client';

import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/stores/useUserStore";

export function LogoutButton() {
    const resetStore = useUserStore(state => state.resetStore);

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            resetStore(); // Clear the user store
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