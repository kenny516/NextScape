"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const plans = [
    {
        name: "Starter",
        description: "Perfect for personal projects and learning",
        icon: Zap,
        price: { monthly: 0, yearly: 0 },
        badge: "Free Forever",
        badgeColor: "secondary",
        features: [
            "Complete Next.js boilerplate",
            "Authentication system",
            "Basic dashboard",
            "PostgreSQL database",
            "shadcn/ui components",
            "TypeScript support",
            "Community support",
            "MIT License"
        ],
        cta: "Get Started Free",
        href: "/sign-up",
        popular: false
    },
    {
        name: "Pro",
        description: "For serious developers and small teams",
        icon: Star,
        price: { monthly: 29, yearly: 24 },
        badge: "Most Popular",
        badgeColor: "default",
        features: [
            "Everything in Starter",
            "Advanced components library",
            "Email templates",
            "Analytics dashboard",
            "User management",
            "Role-based permissions",
            "Priority support",
            "Commercial license",
            "1 year of updates"
        ],
        cta: "Start Pro Trial",
        href: "/sign-up?plan=pro",
        popular: true
    },
    {
        name: "Team",
        description: "For teams and growing businesses",
        icon: Crown,
        price: { monthly: 99, yearly: 82 },
        badge: "Best Value",
        badgeColor: "secondary",
        features: [
            "Everything in Pro",
            "Advanced admin panel",
            "Multi-tenancy support",
            "Custom integrations",
            "Team collaboration tools",
            "Advanced analytics",
            "White-label options",
            "Dedicated support",
            "Custom development"
        ],
        cta: "Start Team Trial",
        href: "/sign-up?plan=team",
        popular: false
    },
    {
        name: "Enterprise",
        description: "For large organizations with custom needs",
        icon: Rocket,
        price: { monthly: "Custom", yearly: "Custom" },
        badge: "Contact Sales",
        badgeColor: "outline",
        features: [
            "Everything in Team",
            "Custom development",
            "On-premise deployment",
            "SLA guarantees",
            "Security audit",
            "Training & onboarding",
            "24/7 phone support",
            "Source code access",
            "Unlimited customization"
        ],
        cta: "Contact Sales",
        href: "/contact",
        popular: false
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
}

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(false)

    const formatPrice = (price: number | string) => {
        if (typeof price === "string") return price
        return `$${price}`
    }

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <Badge variant="outline" className="mb-4">
                        Pricing
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Choose Your
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {" "}Perfect Plan
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Start building for free, then add a site plan to go live.
                        Account plans unlock additional features.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center space-x-4">
                        <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            Monthly
                        </span>
                        <Switch
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                            className="data-[state=checked]:bg-primary"
                        />
                        <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            Yearly
                        </span>
                        <Badge variant="secondary" className="ml-2">
                            Save 20%
                        </Badge>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-4 gap-6"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                            className={plan.popular ? "lg:scale-105" : ""}
                        >
                            <Card className={`h-full relative ${plan.popular
                                    ? "border-primary shadow-xl shadow-primary/20"
                                    : "hover:border-primary/20"
                                } transition-all duration-300`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <Badge className="px-4 py-1">
                                            {plan.badge}
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8">
                                    {/* Icon */}
                                    <div className="mx-auto mb-4">
                                        <div className={`w-12 h-12 rounded-lg ${plan.popular
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                            } flex items-center justify-center`}>
                                            <plan.icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        {plan.description}
                                    </p>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-4xl font-bold">
                                                {formatPrice(isYearly ? plan.price.yearly : plan.price.monthly)}
                                            </span>
                                            {typeof plan.price.monthly === "number" && (
                                                <span className="text-muted-foreground ml-2">
                                                    /{isYearly ? "year" : "month"}
                                                </span>
                                            )}
                                        </div>
                                        {isYearly && typeof plan.price.monthly === "number" && plan.price.monthly > 0 && (
                                            <p className="text-sm text-muted-foreground mt-1">
                                                ${plan.price.monthly}/month billed annually
                                            </p>
                                        )}
                                    </div>

                                    {!plan.popular && (
                                        <Badge variant={plan.badgeColor as "secondary" | "outline"} className="mb-4">
                                            {plan.badge}
                                        </Badge>
                                    )}
                                </CardHeader>

                                <CardContent className="pt-0">
                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center space-x-3">
                                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Button
                                        asChild
                                        size="lg"
                                        className={`w-full ${plan.popular
                                                ? "bg-primary hover:bg-primary/90"
                                                : ""
                                            }`}
                                        variant={plan.popular ? "default" : "outline"}
                                    >
                                        <Link href={plan.href}>
                                            {plan.cta}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-4">
                        Have questions about our pricing?
                    </p>
                    <Button variant="outline" asChild>
                        <Link href="/faq">
                            View FAQ
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
