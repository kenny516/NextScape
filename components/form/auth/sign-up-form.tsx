"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/custom/icon"
import Link from "next/link"
import { Loader, Loader2 } from "lucide-react"
import Logo from "@/components/custom/logo"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

const signUpSchema = z
    .object({
        username: z.string().min(2, "Username must be at least 2 characters"),

        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
    const { toast } = useToast();
    const router = useRouter();
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    })

    useEffect(() => {
        if (loadingProvider) {
            const timer = setTimeout(() => setLoadingProvider(null), 5000) // Réinitialise après 5 secondes
            return () => clearTimeout(timer)
        }
    }, [loadingProvider])

    const onSubmit = async (dataForm: SignUpFormData) => {
        try {
            const { confirmPassword: _unused, ...signUpData } = dataForm
            void _unused

            const { error } = await authClient.signUp.email({
                email: signUpData.email,
                password: signUpData.password,
                name: signUpData.username,
                callbackURL: "/content/back-office"
            }, {
                onRequest: () => {
                    setIsLoading(true)
                },
                onSuccess: () => {
                    setIsLoading(false)
                    toast({
                        variant: "default",
                        title: "Registration Successful",
                        description: "You have successfully registered. Please check your email to verify your account.",
                    })
                    router.push("/sign-in")
                },
                onError: (ctx) => {
                    setIsLoading(false)
                    toast({
                        variant: "destructive",
                        title: "Registration Failed",
                        description: ctx.error.message,
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })
                }
            })

            if (error) {
                throw new Error(error.message)
            }

        } catch (error) {
            setIsLoading(false)
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: error instanceof Error ? error.message : "An unexpected error occurred",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
            <Card className="shadow-lg">
                <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4 text-center flex flex-col items-center">
                            <Logo className="h-16flex justify-center w-full" variant="full" />
                            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                            <p className="text-sm text-muted-foreground">Sign up for your Acme Inc account</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Name</Label>
                                <Input
                                    {...register("username")}
                                    id="username"
                                    type="text"
                                    placeholder="John Doe"
                                    className={errors.username ? "border-red-500" : ""}
                                />
                                {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                            </div>
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
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    {...register("confirmPassword")}
                                    id="confirmPassword"
                                    type="password"
                                    className={errors.confirmPassword ? "border-red-500" : ""}
                                />
                                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
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
                                    authClient.signIn.social({
                                        provider: provider as "apple" | "google" | "facebook",
                                        callbackURL: "/content/back-office"
                                    })
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
                        Already have an account?{" "}
                        <Link href="/sign-in" className="font-medium text-primary hover:underline">
                            Log in
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

