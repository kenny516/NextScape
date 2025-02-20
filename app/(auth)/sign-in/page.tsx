import { Suspense } from "react"
import { SignInForm } from "@/components/form/auth/sign-in-form"

export default function SignInPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <Suspense>
                    <SignInForm />
                </Suspense>
            </div>
        </div>
    )
}
