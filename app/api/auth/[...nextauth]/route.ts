import NextAuth, { DefaultUser, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";

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
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_ID as string,
            clientSecret: process.env.INSTAGRAM_SECRET as string,
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.username || !credentials?.password || !credentials?.email) {
                    return null;
                }
                console.log(credentials);
                return { id: "1", name: "Test User", email: "Test email" };
            }
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