"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react"
import { Icons } from "@/components/custom/icon"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const features = [
    {
        icon: Zap,
        text: "Lightning Fast"
    },
    {
        icon: Shield,
        text: "Production Ready"
    },
    {
        icon: Sparkles,
        text: "Modern Stack"
    }
]

export default function LandingHero() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Valeurs fixes pour éviter l'hydratation mismatch
    const animatedElements = [
        { x: 100, y: 150, delay: 0, duration: 3 },
        { x: 300, y: 200, delay: 0.2, duration: 4 },
        { x: 500, y: 100, delay: 0.4, duration: 5 },
        { x: 700, y: 300, delay: 0.6, duration: 3.5 },
        { x: 200, y: 400, delay: 0.8, duration: 4.5 },
        { x: 600, y: 250, delay: 1.0, duration: 3.2 },
        { x: 150, y: 350, delay: 1.2, duration: 4.8 },
        { x: 450, y: 180, delay: 1.4, duration: 3.8 },
        { x: 750, y: 120, delay: 1.6, duration: 4.2 },
        { x: 350, y: 380, delay: 1.8, duration: 3.6 },
        { x: 550, y: 220, delay: 2.0, duration: 4.4 },
        { x: 250, y: 160, delay: 0.3, duration: 3.4 },
        { x: 650, y: 320, delay: 0.7, duration: 4.6 },
        { x: 400, y: 280, delay: 1.1, duration: 3.9 },
        { x: 180, y: 240, delay: 1.5, duration: 4.1 },
        { x: 480, y: 140, delay: 1.9, duration: 3.7 },
        { x: 680, y: 360, delay: 0.5, duration: 4.3 },
        { x: 320, y: 190, delay: 0.9, duration: 3.3 },
        { x: 520, y: 310, delay: 1.3, duration: 4.7 },
        { x: 420, y: 170, delay: 1.7, duration: 3.1 }
    ]

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {mounted && animatedElements.map((element, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/20 rounded-full"
                        initial={{
                            x: element.x,
                            y: element.y,
                            scale: 0
                        }}
                        animate={{
                            y: [element.y, element.y - 100],
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: element.duration,
                            repeat: Infinity,
                            delay: element.delay
                        }}
                    />
                ))}
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="mb-8"
                    >
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Nouveau : Support de Next.js 15 & React 19
                        </Badge>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                    >
                        Build Modern Apps{" "}
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Faster Than Ever
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        NextScape is a complete Next.js boilerplate with authentication,
                        dashboard, database setup, and everything you need to ship your
                        next SaaS product in days, not months.
                    </motion.p>

                    {/* Feature Pills */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm border rounded-full px-4 py-2"
                            >
                                <feature.icon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Button size="lg" className="px-8 py-4 text-lg group" asChild>
                            <Link href="/sign-up">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>

                        <Button size="lg" variant="outline" className="px-8 py-4 text-lg" asChild>
                            <Link href="https://github.com/kenny516/NextScape" target="_blank" rel="noopener noreferrer">
                                <div className="mr-2 h-5 w-5">
                                    <Icons.github />
                                </div>
                                View on GitHub
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">99%</div>
                            <div className="text-muted-foreground">TypeScript Coverage</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">50+</div>
                            <div className="text-muted-foreground">Pre-built Components</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">5min</div>
                            <div className="text-muted-foreground">Setup Time</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}
