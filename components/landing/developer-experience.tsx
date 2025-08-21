"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    Terminal,
    Copy,
    Check,
    FileCode,
    GitBranch,
    Zap,
    Package,
    Settings,
    Play
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const codeBlocks = {
    setup: `# Clone and setup in 3 commands
git clone https://github.com/kenny516/NextScape.git
cd NextScape
pnpm install && pnpm dev

# Your app is running on http://localhost:3000 🚀`,

    auth: `// components/auth/login-form.tsx
import { signIn } from "@/lib/auth-client"

export function LoginForm() {
  const handleSubmit = async (data: FormData) => {
    await signIn.email({
      email: data.get("email") as string,
      password: data.get("password") as string,
    })
  }

  return (
    <form action={handleSubmit}>
      {/* Form components */}
    </form>
  )
}`,

    database: `// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       String @id @default(cuid())
  title    String
  content  String
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}`,

    component: `// components/ui/data-table.tsx
import { DataTable } from "@/components/ui/data-table"

export function UsersTable() {
  const data = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  return (
    <DataTable
      columns={columns}
      data={data || []}
      searchKey="name"
      searchPlaceholder="Search users..."
    />
  )
}`
}

const features = [
    {
        icon: Terminal,
        title: "Quick Setup",
        description: "Get started in less than 5 minutes with our automated setup script",
        time: "< 5 min"
    },
    {
        icon: FileCode,
        title: "Type Safety",
        description: "End-to-end TypeScript with strict typing and IntelliSense support",
        time: "Built-in"
    },
    {
        icon: GitBranch,
        title: "Git Workflows",
        description: "Pre-configured GitHub Actions for CI/CD and automated deployments",
        time: "Ready to use"
    },
    {
        icon: Package,
        title: "Modern Tools",
        description: "Latest versions of React, Next.js, Prisma, and all essential packages",
        time: "Always updated"
    }
]

export default function DeveloperExperience() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null)
    const { toast } = useToast()

    const copyToClipboard = async (code: string, type: string) => {
        try {
            await navigator.clipboard.writeText(code)
            setCopiedCode(type)
            toast({
                title: "Code copied!",
                description: "The code has been copied to your clipboard.",
            })

            setTimeout(() => setCopiedCode(null), 2000)
        } catch {
            toast({
                title: "Failed to copy",
                description: "Please try again or copy manually.",
                variant: "destructive"
            })
        }
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
                        Developer First
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Built for
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {" "}Developer Experience
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We obsess over developer experience. From setup to deployment,
                        every step is optimized for speed, clarity, and joy.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="h-full text-center group hover:border-primary/20 transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                            <feature.icon className="w-6 h-6 text-primary" />
                                        </div>
                                    </div>
                                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                                    <Badge variant="secondary" className="text-xs">
                                        {feature.time}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Code Examples */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Card className="overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b">
                            <CardTitle className="flex items-center space-x-2">
                                <Terminal className="w-5 h-5" />
                                <span>See It In Code</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Tabs defaultValue="setup" className="w-full">
                                <div className="border-b bg-muted/30">
                                    <TabsList className="w-full justify-start rounded-none h-auto p-1 bg-transparent">
                                        <TabsTrigger value="setup" className="rounded-sm data-[state=active]:bg-background">
                                            <Play className="w-4 h-4 mr-2" />
                                            Setup
                                        </TabsTrigger>
                                        <TabsTrigger value="auth" className="rounded-sm data-[state=active]:bg-background">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Auth
                                        </TabsTrigger>
                                        <TabsTrigger value="database" className="rounded-sm data-[state=active]:bg-background">
                                            <FileCode className="w-4 h-4 mr-2" />
                                            Database
                                        </TabsTrigger>
                                        <TabsTrigger value="component" className="rounded-sm data-[state=active]:bg-background">
                                            <Zap className="w-4 h-4 mr-2" />
                                            Components
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                {Object.entries(codeBlocks).map(([key, code]) => (
                                    <TabsContent key={key} value={key} className="m-0">
                                        <div className="relative">
                                            <pre className="p-6 text-sm overflow-x-auto bg-muted/20">
                                                <code className="text-foreground font-mono leading-relaxed">
                                                    {code}
                                                </code>
                                            </pre>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="absolute top-4 right-4"
                                                onClick={() => copyToClipboard(code, key)}
                                            >
                                                {copiedCode === key ? (
                                                    <Check className="w-4 h-4" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                                <span className="ml-2 hidden sm:inline">
                                                    {copiedCode === key ? "Copied!" : "Copy"}
                                                </span>
                                            </Button>
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center"
                >
                    <div>
                        <div className="text-3xl font-bold text-primary mb-2">10x</div>
                        <div className="text-muted-foreground">Faster Development</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary mb-2">99%</div>
                        <div className="text-muted-foreground">Type Coverage</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary mb-2">0</div>
                        <div className="text-muted-foreground">Configuration Required</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
