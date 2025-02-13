import NextAuth, { DefaultUser, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import { prisma } from "@/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { comparePassword } from "@/app/action/auth/auth.action";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image?: string;
            provider?: string;
            providerId?: string;
            accessToken?: string;
        };
    }

    interface User extends DefaultUser {
        id: string;
        provider?: string;
        providerId?: string;
        accessToken?: string;
    }
}

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
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
        CredentialsProvider({
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

                // Vérifier si l'utilisateur existe dans la base de données
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("Aucun utilisateur trouvé avec cet email");
                }

                // Vérifier si le mot de passe est correct
                const isValidPassword = await comparePassword(credentials.password, user.password);

                if (!isValidPassword) {
                    throw new Error("Mot de passe incorrect");
                }

                // Retourner l'utilisateur authentifié
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/sign-in",
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account && profile) {
                console.log("Sign in details:");
                console.log("Account:", JSON.stringify(account, null, 2));
                console.log("Profile:", JSON.stringify(profile, null, 2));
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.provider = account?.provider;
                token.providerId = account?.providerAccountId;
                token.accessToken = account?.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.provider = token.provider as string;
                session.user.providerId = token.providerId as string;
                session.user.accessToken = token.accessToken as string;
            }
            return session;
        },
    },
});


export { handler as GET, handler as POST };

