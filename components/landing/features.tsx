"use client"

import { motion } from "framer-motion"
import {
    Zap,
    Shield,
    Database,
    Palette,
    Code2,
    Lock,
    Smartphone,
    BarChart3,
    Mail,
    Settings,
    Users,
    Rocket
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const features = [
    {
        icon: Zap,
        title: "Next.js 15 & React 19",
        description: "Built with the latest versions featuring Turbopack, Server Components, and App Router.",
        category: "Framework",
        gradient: "from-yellow-500 to-orange-500"
    },
    {
        icon: Lock,
        title: "Better Auth Integration",
        description: "Complete authentication system with email/password, OAuth providers, and session management.",
        category: "Security",
        gradient: "from-green-500 to-emerald-500"
    },
    {
        icon: Database,
        title: "Prisma + PostgreSQL",
        description: "Type-safe database operations with Prisma ORM and PostgreSQL for production reliability.",
        category: "Database",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: Palette,
        title: "shadcn/ui + Tailwind",
        description: "Beautiful, accessible components with dark mode support and customizable design system.",
        category: "Design",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        icon: Code2,
        title: "TypeScript & ESLint",
        description: "Full TypeScript support with strict type checking and comprehensive linting rules.",
        category: "DX",
        gradient: "from-indigo-500 to-blue-500"
    },
    {
        icon: Shield,
        title: "Production Ready",
        description: "Docker support, CI/CD workflows, error handling, and monitoring out of the box.",
        category: "DevOps",
        gradient: "from-red-500 to-rose-500"
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Built-in dashboard with charts, metrics, and data visualization using Recharts.",
        category: "Analytics",
        gradient: "from-teal-500 to-green-500"
    },
    {
        icon: Smartphone,
        title: "Mobile Responsive",
        description: "Optimized for all devices with mobile-first design and progressive web app features.",
        category: "Mobile",
        gradient: "from-orange-500 to-red-500"
    },
    {
        icon: Mail,
        title: "Email Templates",
        description: "Pre-built email templates for authentication, notifications, and marketing campaigns.",
        category: "Communication",
        gradient: "from-cyan-500 to-blue-500"
    },
    {
        icon: Users,
        title: "User Management",
        description: "Complete user management system with roles, permissions, and profile management.",
        category: "Users",
        gradient: "from-violet-500 to-purple-500"
    },
    {
        icon: Settings,
        title: "Admin Panel",
        description: "Comprehensive admin interface for managing users, content, and system settings.",
        category: "Admin",
        gradient: "from-gray-500 to-slate-500"
    },
    {
        icon: Rocket,
        title: "One-Click Deploy",
        description: "Deploy to Vercel, Railway, or any platform with pre-configured deployment scripts.",
        category: "Deployment",
        gradient: "from-pink-500 to-rose-500"
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

export default function FeaturesSection() {
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
                        Everything You Need
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Ship Faster with
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {" "}Modern Stack
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        NextScape comes with everything you need to build and deploy production-ready
                        applications. No more boilerplate setup - focus on your unique features.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300 group">
                                <CardContent className="p-6">
                                    {/* Icon */}
                                    <div className="mb-4">
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <Badge variant="secondary" className="mb-3 text-xs">
                                        {feature.category}
                                    </Badge>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-4">
                        And much more features coming soon...
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {["Payments", "Multi-tenancy", "AI Integration", "Real-time Chat"].map((feature) => (
                            <Badge key={feature} variant="outline" className="opacity-60">
                                {feature}
                            </Badge>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
