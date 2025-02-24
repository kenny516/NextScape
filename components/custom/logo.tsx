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
                    size={variant === "icon" ? 24 : 20}
                    //you can change the color of the icon by changing the color attribute
                    color="currentColor"
                />
            </div>
            {variant === "full" && (
                <span className="text-xl">Dashboard</span>
            )}
        </div>
    )
}
