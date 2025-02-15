import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-xl text-muted-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild variant="default">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}