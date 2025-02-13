// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
    matcher: [
        // Protéger les routes /content et /dashboard
        '/content/:path*',
        '/dashboard/:path*',
        // Exclure les fichiers publics et API routes
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
};

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET
    });

    if (token) {
        return NextResponse.next();
    }

    // Rediriger vers la page de connexion avec le callback URL
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(signInUrl);
}