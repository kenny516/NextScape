import { cn } from "@/lib/utils"
import { Info, LayoutGrid } from "lucide-react"
import Link from "next/link"

interface LogoProps {
    variant?: "full" | "icon"
    className?: string
}

export default function Logo({ variant = "full", className }: LogoProps) {
    return (
        <Link
            href="/"
            className={cn(
                "flex items-center gap-2 font-bold",
                className
            )}
        >
            <div className="rounded-lg bg-primary p-1">
                <LayoutGrid
                    size={variant === "icon" ? 24 : 20}
                    //you can change the color of the icon by changing the color attribute
                    color="currentColor"
                    className="text-primary-foreground"
                />
            </div>
            {variant === "full" && (
                <span className="text-xl">Dashboard</span>
            )}
        </Link>
    )
}
