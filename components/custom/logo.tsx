import { cn } from "@/lib/utils"
import { LayoutGrid } from "lucide-react"

interface LogoProps {
    variant?: "full" | "icon"
    className?: string
}

export default function Logo({ variant = "full", className }: LogoProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 font-bold",
                className
            )}
        >
            <div className="rounded-lg bg-primary p-1">
                <LayoutGrid
                    className="text-primary-foreground"
                    size={variant === "icon" ? 24 : 20}
                />
            </div>
            {variant === "full" && (
                <span className="text-xl">Dashboard</span>
            )}
        </div>
    )
}
