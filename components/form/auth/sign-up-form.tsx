"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/custom/icon"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import Logo from "@/components/custom/logo"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpAction } from "@/app/action/auth/auth.action"
import { useServerAction } from "zsa-react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

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
    const { isPending, execute } = useServerAction(signUpAction)
    const { toast } = useToast()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (dataForm: SignUpFormData) => {
        try {
            const { confirmPassword: _unused, ...signUpData } = dataForm
            void _unused // explicitly mark as intentionally unused

            const [data, err] = await execute(signUpData)
            console.log(data, err)
            if (err) {
                toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: err.message || "Please check your information and try again.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
                return
            } else {
                toast({
                    variant: "default",
                    title: "Registration Successful",
                    description: "You have successfully registered.",
                    action: <ToastAction altText="Continue">Continue</ToastAction>,
                })
            }

            // Connexion automatique après l'inscription réussie
            const response = await signIn("credentials", {
                email: signUpData.email,
                password: signUpData.password,
                callbackUrl: "/content",
                redirect: false,
            })
            if (response?.error) {
                toast({
                    variant: "destructive",
                    title: "SignIn Failed",
                    description: response.error,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
            if (response?.status === 200) {
                toast({
                    variant: "default",
                    title: "Logged in successfully",
                    description: "Welcome back!",
                })
                router.push("/content")
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: "An error occurred during registration. Please check your information and try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            console.error("Error during sign up:", error)
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
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? (
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
                                onClick={() => signIn(provider, { callbackUrl: "/content" })}
                            >
                                <span className="h-5 w-5">{Icons[provider as keyof typeof Icons]()}</span>
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

