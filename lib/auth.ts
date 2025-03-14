import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import AppleProvider from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/prisma/prisma";
import { comparePassword } from "@/app/action/auth/auth.action";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-out",
        error: "/sign-in",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                token.id = user.id;
            }
            if (trigger === "update") {
                // Réinitialiser le token lors de la mise à jour
                token = {};
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    events: {
        signOut: async () => {
            // Force une réinitialisation complète du token
            if (typeof window !== 'undefined') {
                window.localStorage.clear();
                window.sessionStorage.clear();
            }
        },
    },
    providers: [

        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: 'select_account',
                },
            }
        }),
        FacebookProvider({
            clientId: process.env.AUTH_FACEBOOK_ID as string,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET as string,
        }),
        InstagramProvider({
            clientId: process.env.AUTH_INSTAGRAM_ID as string,
            clientSecret: process.env.AUTH_INSTAGRAM_SECRET as string,
        }),
        AppleProvider({
            clientId: process.env.AUTH_APPLE_ID as string,
            clientSecret: process.env.AUTH_APPLE_SECRET as string,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email et mot de passe requis");
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                const user = await prisma.user.findUnique({
                    where: { email: email },
                });

                if (!user) {
                    throw new Error("Aucun utilisateur trouvé avec cet email");
                }

                if (!user.password) {
                    throw new Error("Aucun mot de passe défini pour cet utilisateur");
                }

                const isValidPassword = await comparePassword(password, user.password);

                if (!isValidPassword) {
                    throw new Error("Mot de passe incorrect");
                }
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            },
        })
    ],
})