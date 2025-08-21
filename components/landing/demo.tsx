"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, Monitor, Smartphone, Tablet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const demoTabs = [
    {
        id: "dashboard",
        label: "Dashboard",
        title: "Analytics Dashboard",
        description: "Real-time metrics and beautiful charts",
        preview: "/api/placeholder/800/600?text=Dashboard+Preview",
        features: ["Real-time data", "Interactive charts", "Custom metrics", "Export options"]
    },
    {
        id: "auth",
        label: "Authentication",
        title: "Secure Authentication",
        description: "Email/password and OAuth providers",
        preview: "/api/placeholder/800/600?text=Auth+Preview",
        features: ["Email verification", "OAuth providers", "Session management", "Role-based access"]
    },
    {
        id: "admin",
        label: "Admin Panel",
        title: "Admin Interface",
        description: "Comprehensive management system",
        preview: "/api/placeholder/800/600?text=Admin+Preview",
        features: ["User management", "Content management", "System settings", "Audit logs"]
    },
    {
        id: "mobile",
        label: "Mobile Ready",
        title: "Mobile Experience",
        description: "Responsive design for all devices",
        preview: "/api/placeholder/400/600?text=Mobile+Preview",
        features: ["Touch optimized", "PWA support", "Offline mode", "Native feel"]
    }
]

const devices = [
    { id: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
    { id: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
    { id: "mobile", label: "Mobile", icon: Smartphone, width: "375px" }
]

export default function DemoSection() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [selectedDevice, setSelectedDevice] = useState("desktop")
    const [isPlaying, setIsPlaying] = useState(false)

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
                        See It In Action
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Experience the
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {" "}Power
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Explore our interactive demo to see how NextScape can accelerate your development
                        process and create amazing user experiences.
                    </p>
                </motion.div>

                {/* Demo Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
                            {demoTabs.map((tab) => (
                                <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* Device Selector */}
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center space-x-2 bg-background rounded-lg p-1 border">
                                {devices.map((device) => (
                                    <Button
                                        key={device.id}
                                        variant={selectedDevice === device.id ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setSelectedDevice(device.id)}
                                        className="flex items-center space-x-2"
                                    >
                                        <device.icon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{device.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {demoTabs.map((tab) => (
                            <TabsContent key={tab.id} value={tab.id} className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid lg:grid-cols-2 gap-8 items-center"
                                >
                                    {/* Info Panel */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-3">{tab.title}</h3>
                                            <p className="text-lg text-muted-foreground mb-6">
                                                {tab.description}
                                            </p>
                                        </div>

                                        {/* Features List */}
                                        <div className="space-y-3">
                                            {tab.features.map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Demo Controls */}
                                        <div className="flex items-center space-x-4 pt-4">
                                            <Button
                                                onClick={() => setIsPlaying(!isPlaying)}
                                                className="flex items-center space-x-2"
                                            >
                                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                                <span>{isPlaying ? "Pause" : "Play"} Demo</span>
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <RotateCcw className="w-4 h-4 mr-2" />
                                                Restart
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Demo Preview */}
                                    <div className="relative">
                                        <motion.div
                                            animate={{
                                                width: devices.find(d => d.id === selectedDevice)?.width
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="mx-auto"
                                        >
                                            <Card className="overflow-hidden border-2">
                                                <CardContent className="p-0">
                                                    <div className="aspect-video bg-gradient-to-br from-background to-muted flex items-center justify-center relative overflow-hidden">
                                                        {/* Mock Browser Header */}
                                                        <div className="absolute top-0 left-0 right-0 h-8 bg-muted border-b flex items-center px-3 space-x-2">
                                                            <div className="flex space-x-1">
                                                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                                                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                            </div>
                                                            <div className="flex-1 mx-4">
                                                                <div className="h-4 bg-background rounded text-xs flex items-center px-2 text-muted-foreground">
                                                                    nextscape.app/{tab.id}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Mock Content */}
                                                        <div className="mt-8 p-6 w-full">
                                                            <div className="space-y-4">
                                                                <div className="h-4 bg-primary/20 rounded w-3/4" />
                                                                <div className="h-32 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-lg flex items-center justify-center">
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold mb-2">{tab.title}</div>
                                                                        <div className="text-sm text-muted-foreground">
                                                                            Interactive demo coming soon
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div className="h-16 bg-muted rounded" />
                                                                    <div className="h-16 bg-muted rounded" />
                                                                    <div className="h-16 bg-muted rounded" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Playing Indicator */}
                                                        {isPlaying && (
                                                            <motion.div
                                                                className="absolute inset-0 bg-primary/5"
                                                                animate={{ opacity: [0.5, 0, 0.5] }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                            />
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-6">
                        Ready to experience NextScape yourself?
                    </p>
                    <Button size="lg" asChild>
                        <a href="#cta">
                            Try Live Demo
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
