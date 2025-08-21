import { Suspense } from "react"
import { Metadata } from "next"

import LandingHeader from "@/components/landing/header"
import LandingHero from "@/components/landing/hero"
import FeaturesSection from "@/components/landing/features"
import DemoSection from "@/components/landing/demo"
import DeveloperExperience from "@/components/landing/developer-experience"
import TestimonialsSection from "@/components/landing/testimonials"
import PricingSection from "@/components/landing/pricing"
import LandingFooter from "@/components/landing/footer"
import CTASection from "@/components/landing/cta"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title: "NextScape - Modern Next.js Boilerplate",
    description: "A complete Next.js boilerplate with authentication, dashboard, and everything you need to build production-ready applications.",
    keywords: ["Next.js", "React", "TypeScript", "Boilerplate", "Authentication", "Dashboard", "shadcn/ui"],
    authors: [{ name: "NextScape Team" }],
    creator: "NextScape",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://nextscape.vercel.app",
        title: "NextScape - Modern Next.js Boilerplate",
        description: "A complete Next.js boilerplate with authentication, dashboard, and everything you need to build production-ready applications.",
        siteName: "NextScape",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "NextScape - Modern Next.js Boilerplate",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "NextScape - Modern Next.js Boilerplate",
        description: "A complete Next.js boilerplate with authentication, dashboard, and everything you need to build production-ready applications.",
        images: ["/og-image.png"],
        creator: "@nextscape",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <LandingHeader />

            {/* Main Content */}
            <main className="flex-1">
                {/* Hero Section */}
                <section id="hero">
                    <Suspense fallback={<div className="h-screen bg-gradient-to-b from-background to-muted/50" />}>
                        <LandingHero />
                    </Suspense>
                </section>

                {/* Features Section */}
                <section id="features">
                    <Suspense fallback={<div className="h-96 bg-background" />}>
                        <FeaturesSection />
                    </Suspense>
                </section>

                {/* Demo Section */}
                <section id="demo">
                    <Suspense fallback={<div className="h-96 bg-muted/30" />}>
                        <DemoSection />
                    </Suspense>
                </section>

                {/* Developer Experience */}
                <section id="dx">
                    <Suspense fallback={<div className="h-96 bg-background" />}>
                        <DeveloperExperience />
                    </Suspense>
                </section>

                {/* Testimonials */}
                <section id="testimonials">
                    <Suspense fallback={<div className="h-96 bg-muted/30" />}>
                        <TestimonialsSection />
                    </Suspense>
                </section>

                {/* Pricing */}
                <section id="pricing">
                    <Suspense fallback={<div className="h-96 bg-background" />}>
                        <PricingSection />
                    </Suspense>
                </section>

                {/* CTA */}
                <section id="cta">
                    <Suspense fallback={<div className="h-64 bg-muted/30" />}>
                        <CTASection />
                    </Suspense>
                </section>
            </main>

            {/* Footer */}
            <LandingFooter />
        </div>
    )
}
