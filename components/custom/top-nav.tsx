import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "../theme/toggle-theme"
import { BreadcrumbItem } from "@/types"
import { Button } from "../ui/button"
import { ProfileMenu } from "./profile/profile-menu"
import { getUser } from "@/lib/auth-session"


export async function TopNav({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {

    const user = await getUser();
    return (
        <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b rounded-xl border-gray-200 dark:border-[#1F1F23] w-full h-full">
            <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
                {breadcrumbs.map((item, index) => (
                    <div key={item.label} className="flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
                <Button
                    variant="outline" size="icon"
                    className="rounded-xl"
                >
                    <Link href="" className="">
                        <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                    </Link>
                </Button>

                <ThemeToggle className="rounded-xl" />

                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <Image
                            src={user?.image || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png"}
                            alt="User avatar"
                            width={28}
                            height={28}
                            className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
                    >
                        <ProfileMenu />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}

