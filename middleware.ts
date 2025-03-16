import axios from "axios";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    try {
        const { data: session } = await axios.get<Session>("/api/auth/get-session", {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
            },
        });

        if (!session) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // En cas d'erreur, redirigez vers la page de connexion
        console.error('Erreur de session:', error);
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
}

export const config = {
    matcher: ["/dashboard", "/content", "/content/:path*"] // Protect /content and all its sub-routes
};