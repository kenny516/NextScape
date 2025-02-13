"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Loader } from "lucide-react"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { Icons } from "@/components/custom/icon"
import Logo from "@/components/custom/logo"

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
    const { toast } = useToast()
    const searchParams = useSearchParams()

    const error = searchParams.get("error")

    useEffect(() => {
        if (error != "OAuthAccountNotLinked") {
            console.log("error", error)
            toast({
                variant: "destructive",
                title: "SignIn Failed",
                description: error,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } else if (error === "OAuthAccountNotLinked") {
            toast({
                variant: "destructive",
                title: "SignIn Failed",
                description: "Your email is already registered with another provider.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }, [error, toast])


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true)
        try {
            await signIn("credentials", {
                ...data,
                callbackUrl: "/content",
            })
        } catch (error: unknown) {
            toast({
                variant: "destructive",
                title: "SignIn Failed",
                description: error instanceof Error ? error.message : "Please check your information and try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (loadingProvider) {
            const timer = setTimeout(() => setLoadingProvider(null), 5000) // Réinitialise après 5 secondes
            return () => clearTimeout(timer)
        }
    }, [loadingProvider])

    return (
        <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
            <Card className="shadow-lg">
                <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4 text-center">
                            <Logo className="h-16 flex justify-center w-full" variant="full" />
                            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                            <p className="text-sm text-muted-foreground">Login to your Acme Inc account</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="text-sm text-primary hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </Button>
                    </form>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {["apple", "google", "facebook"].map((provider) => (
                            <Button
                                key={provider}
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    setLoadingProvider(provider)
                                    signIn(provider, { callbackUrl: "/content" })
                                }}
                                disabled={loadingProvider !== null}
                            >
                                {loadingProvider === provider ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                    <span className="h-5 w-5">{Icons[provider as keyof typeof Icons]()}</span>
                                )}
                            </Button>
                        ))}
                    </div>
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="font-medium text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
            <p className="mt-4 text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link href="#" className="hover:underline underline-offset-4">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="hover:underline underline-offset-4">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    )
}

