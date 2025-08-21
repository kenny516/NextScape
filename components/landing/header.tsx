"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ExternalLink } from "lucide-react"
import { Icons } from "@/components/custom/icon"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/toggle-theme"
import Logo from "@/components/custom/logo"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const navigationItems = [
    {
        title: "Features",
        href: "#features",
        description: "Discover all the powerful features included in NextScape"
    },
    {
        title: "Demo",
        href: "#demo",
        description: "See NextScape in action with our interactive demo"
    },
    {
        title: "Docs",
        href: "#docs",
        description: "Comprehensive documentation and guides"
    },
    {
        title: "GitHub",
        href: "https://github.com/kenny516/NextScape",
        description: "View source code and contribute",
        external: true
    }
]

const mobileMenuVariants = {
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1] as const
        }
    },
    open: {
        opacity: 1,
        height: "auto",
        transition: {
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1] as const
        }
    }
}

const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2 }
    }
}

export default function LandingHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <motion.header
            className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <nav className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo variant="full" className="text-xl" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        {item.external ? (
                                            <Link
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                )}
                                            >
                                                {item.title}
                                                {item.title === "GitHub" && (
                                                    <div className="ml-1 h-4 w-4">
                                                        <Icons.github />
                                                    </div>
                                                )}
                                                {item.external && item.title !== "GitHub" && <ExternalLink className="ml-1 h-4 w-4" />}
                                            </Link>
                                        ) : (
                                            <NavigationMenuLink
                                                href={item.href}
                                                className={cn(
                                                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                )}
                                            >
                                                {item.title}
                                            </NavigationMenuLink>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <Button variant="ghost" asChild>
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/sign-up">Get Started</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center space-x-2">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            className="md:hidden"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="md:hidden border-t"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            style={{ overflow: "hidden" }}
                        >
                            <div className="py-4 space-y-2">
                                {navigationItems.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        variants={mobileItemVariants}
                                        initial="closed"
                                        animate="open"
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={closeMobileMenu}
                                            target={item.external ? "_blank" : undefined}
                                            rel={item.external ? "noopener noreferrer" : undefined}
                                            className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent transition-colors"
                                        >
                                            <div>
                                                <div className="font-medium flex items-center">
                                                    {item.title}
                                                    {item.title === "GitHub" && (
                                                        <div className="ml-1 h-4 w-4">
                                                            <Icons.github />
                                                        </div>
                                                    )}
                                                    {item.external && item.title !== "GitHub" && <ExternalLink className="ml-1 h-4 w-4" />}
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Mobile Auth Buttons */}
                                <div className="pt-4 border-t space-y-2">
                                    <Button variant="ghost" className="w-full" asChild>
                                        <Link href="/sign-in" onClick={closeMobileMenu}>
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button className="w-full" asChild>
                                        <Link href="/sign-up" onClick={closeMobileMenu}>
                                            Get Started
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    )
}
