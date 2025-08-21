"use client"

import Link from "next/link"
import { Twitter, Linkedin, Mail, Heart } from "lucide-react"
import { Icons } from "@/components/custom/icon"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Logo from "@/components/custom/logo"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const footerLinks = {
    product: [
        { name: "Features", href: "#features" },
        { name: "Demo", href: "#demo" },
        { name: "Pricing", href: "#pricing" },
        { name: "Changelog", href: "#changelog" }
    ],
    resources: [
        { name: "Documentation", href: "#docs" },
        { name: "Guides", href: "#guides" },
        { name: "API Reference", href: "#api" },
        { name: "Community", href: "#community" }
    ],
    company: [
        { name: "About", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" }
    ],
    legal: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "License", href: "#license" },
        { name: "Security", href: "#security" }
    ]
}

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/kenny516/NextScape",
        hoverColor: "hover:text-gray-900 dark:hover:text-white"
    },
    {
        name: "Twitter",
        href: "#",
        icon: Twitter,
        hoverColor: "hover:text-blue-500"
    },
    {
        name: "LinkedIn",
        href: "#",
        icon: Linkedin,
        hoverColor: "hover:text-blue-600"
    },
    {
        name: "Email",
        href: "mailto:contact@nextscape.com",
        icon: Mail,
        hoverColor: "hover:text-green-600"
    }
]

export default function LandingFooter() {
    const [email, setEmail] = useState("")
    const [isSubscribing, setIsSubscribing] = useState(false)
    const { toast } = useToast()

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubscribing(true)

        // Simulate newsletter subscription
        await new Promise(resolve => setTimeout(resolve, 1000))

        toast({
            title: "Successfully subscribed!",
            description: "Thank you for subscribing to our newsletter.",
        })

        setEmail("")
        setIsSubscribing(false)
    }

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4">
                {/* Newsletter Section */}
                <motion.div
                    className="py-12 border-b"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-4">Stay up to date</h3>
                        <p className="text-muted-foreground mb-6">
                            Get the latest updates, new features, and developer resources delivered to your inbox.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1"
                                disabled={isSubscribing}
                            />
                            <Button type="submit" disabled={isSubscribing || !email}>
                                {isSubscribing ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </form>
                    </div>
                </motion.div>

                {/* Links Section */}
                <div className="py-12">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                        {/* Brand */}
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center space-x-2 mb-4">
                                <Logo variant="full" />
                            </Link>
                            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
                                A modern Next.js boilerplate with authentication, dashboard, and everything
                                you need to build production-ready applications.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target={social.href.startsWith("http") ? "_blank" : undefined}
                                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className={`text-muted-foreground transition-colors ${social.hoverColor}`}
                                        aria-label={social.name}
                                    >
                                        {social.name === "GitHub" ? (
                                            <div className="h-5 w-5">
                                                <Icons.github />
                                            </div>
                                        ) : social.icon ? (
                                            <social.icon className="h-5 w-5" />
                                        ) : null}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Product */}
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2">
                                {footerLinks.product.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Bottom Section */}
                <div className="py-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                    <div className="mb-4 md:mb-0">
                        <p>© 2025 NextScape. All rights reserved.</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span>Built with</span>
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                        <span>using</span>
                        <Link
                            href="https://nextjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-foreground transition-colors"
                        >
                            Next.js
                        </Link>
                        <span>&</span>
                        <Link
                            href="https://ui.shadcn.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-foreground transition-colors"
                        >
                            shadcn/ui
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
