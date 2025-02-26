
import Link from "next/link"
import { Ghost, Home, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ConfettiButton } from "@/components/magicui/confetti"

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-muted to-background">

            <Card className="w-full max-w-md mx-auto shadow-lg border-primary/20">
                <CardContent className="pt-6 text-center relative overflow-hidden">
                    <div className="relative">
                        <h1 className="text-9xl font-extrabold text-primary/20 select-none glitch" data-text="404">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center animate-[ping_4s_ease-in-out_infinite]">
                            <Ghost className="size-14 text-primary animate-float" />
                        </div>
                    </div>
                    <h2 className="mt-8 text-2xl font-semibold text-foreground">Oops! Page Not Found</h2>
                    <p className="mt-4 text-muted-foreground">
                        Looks like this page vanished into thin air! Our ghost is still looking for it...
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                    <Button asChild variant="default">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" /> Go Home
                        </Link>
                    </Button>
                    <ConfettiButton variant="outline">
                        <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                    </ConfettiButton>
                </CardFooter>
            </Card>
        </div >
    )
}

