"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Star, Code } from "lucide-react"
import { Icons } from "@/components/custom/icon"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
    { number: "10k+", label: "Downloads" },
    { number: "4.9/5", label: "Rating" },
    { number: "1k+", label: "Stars" },
    { number: "24/7", label: "Support" }
]

const features = [
    {
        icon: Zap,
        text: "5min setup"
    },
    {
        icon: Star,
        text: "Production ready"
    },
    {
        icon: Code,
        text: "Open source"
    }
]

export default function CTASection() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Valeurs fixes pour les éléments animés
    const animatedElements = [
        { x: 150, y: 120, delay: 0, duration: 4 },
        { x: 320, y: 180, delay: 0.3, duration: 5 },
        { x: 500, y: 90, delay: 0.6, duration: 3.5 },
        { x: 680, y: 250, delay: 0.9, duration: 4.5 },
        { x: 200, y: 300, delay: 1.2, duration: 3.8 },
        { x: 450, y: 160, delay: 1.5, duration: 4.2 },
        { x: 620, y: 200, delay: 1.8, duration: 3.2 },
        { x: 100, y: 240, delay: 0.2, duration: 4.8 },
        { x: 380, y: 110, delay: 0.5, duration: 3.6 },
        { x: 550, y: 280, delay: 0.8, duration: 4.4 },
        { x: 280, y: 140, delay: 1.1, duration: 3.9 },
        { x: 480, y: 220, delay: 1.4, duration: 4.1 },
        { x: 650, y: 100, delay: 1.7, duration: 3.4 },
        { x: 180, y: 260, delay: 0.4, duration: 4.6 },
        { x: 420, y: 190, delay: 0.7, duration: 3.7 }
    ]

    return (
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-blue-600/5 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {mounted && animatedElements.map((element, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        initial={{
                            x: element.x,
                            y: element.y,
                            scale: 0
                        }}
                        animate={{
                            y: [element.y, element.y - 50],
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

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Zap className="w-4 h-4 mr-2" />
                            Ready to ship your next project?
                        </Badge>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                    >
                        Start Building
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {" "}Today
                        </span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        Join thousands of developers who chose NextScape to build their next big thing.
                        Get started in minutes, not hours.
                    </motion.p>

                    {/* Feature Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm border rounded-full px-4 py-2"
                            >
                                <feature.icon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
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
                                Star on GitHub
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
