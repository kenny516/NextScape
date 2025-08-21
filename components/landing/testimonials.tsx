"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Full Stack Developer",
        company: "TechCorp",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&size=64&background=3b82f6&color=fff",
        rating: 5,
        content: "NextScape saved me weeks of setup time. The authentication system is rock solid and the developer experience is incredible. I was able to ship my SaaS product in just 2 weeks!",
        highlight: "Shipped SaaS in 2 weeks"
    },
    {
        name: "Marcus Rodriguez",
        role: "Startup Founder",
        company: "InnovateX",
        avatar: "https://ui-avatars.com/api/?name=Marcus+Rodriguez&size=64&background=10b981&color=fff",
        rating: 5,
        content: "As a non-technical founder, I was amazed by how easy it was to get started with NextScape. The documentation is clear and the community is super helpful. Highly recommended!",
        highlight: "Non-technical friendly"
    },
    {
        name: "Alex Kim",
        role: "Senior Engineer",
        company: "DataFlow Inc",
        avatar: "https://ui-avatars.com/api/?name=Alex+Kim&size=64&background=8b5cf6&color=fff",
        rating: 5,
        content: "The code quality is exceptional. TypeScript support is perfect, and the architecture is clean and scalable. This is exactly what I've been looking for in a Next.js boilerplate.",
        highlight: "Exceptional code quality"
    },
    {
        name: "Emily Watson",
        role: "Product Manager",
        company: "GrowthLab",
        avatar: "https://ui-avatars.com/api/?name=Emily+Watson&size=64&background=f59e0b&color=fff",
        rating: 5,
        content: "Our team velocity increased dramatically after switching to NextScape. The built-in analytics dashboard and user management features are production-ready out of the box.",
        highlight: "Increased team velocity"
    },
    {
        name: "David Thompson",
        role: "Freelance Developer",
        company: "Independent",
        avatar: "https://ui-avatars.com/api/?name=David+Thompson&size=64&background=ef4444&color=fff",
        rating: 5,
        content: "I've tried many boilerplates, but NextScape is by far the most complete. The Prisma integration and authentication flow are seamless. This is my go-to starter now.",
        highlight: "Most complete boilerplate"
    },
    {
        name: "Lisa Park",
        role: "Engineering Manager",
        company: "CloudScale",
        avatar: "https://ui-avatars.com/api/?name=Lisa+Park&size=64&background=06b6d4&color=fff",
        rating: 5,
        content: "The developer experience is outstanding. From setup to deployment, everything just works. My team was able to focus on building features instead of infrastructure.",
        highlight: "Outstanding DX"
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

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-current" : "text-muted-foreground"
                        }`}
                />
            ))}
        </div>
    )
}

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-muted/30">
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
                        Testimonials
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Loved by
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {" "}Developers
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Join thousands of developers who are building amazing products with NextScape.
                        Here&apos;s what they have to say about their experience.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Card className="h-full hover:border-primary/20 transition-all duration-300 group">
                                <CardContent className="p-6">
                                    {/* Quote Icon */}
                                    <div className="mb-4">
                                        <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
                                    </div>

                                    {/* Content */}
                                    <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                                        &ldquo;{testimonial.content}&rdquo;
                                    </blockquote>

                                    {/* Highlight Badge */}
                                    <Badge variant="secondary" className="mb-4 text-xs">
                                        {testimonial.highlight}
                                    </Badge>

                                    {/* Rating */}
                                    <div className="mb-4">
                                        <StarRating rating={testimonial.rating} />
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold text-sm">{testimonial.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {testimonial.role} at {testimonial.company}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 text-center"
                >
                    <div>
                        <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                        <div className="text-muted-foreground">Happy Developers</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary mb-2">500+</div>
                        <div className="text-muted-foreground">Projects Built</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                        <div className="text-muted-foreground">Average Rating</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                        <div className="text-muted-foreground">Community Support</div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-6">
                        Join our community of developers building the future
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline">#nextscape</Badge>
                        <Badge variant="outline">#nextjs</Badge>
                        <Badge variant="outline">#typescript</Badge>
                        <Badge variant="outline">#developers</Badge>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
