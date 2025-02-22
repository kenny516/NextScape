// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
    matcher: [
        // Protéger les routes /content et /dashboard
        '/content/:path*',
        // Exclure les fichiers publics et API routes
        '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
    ]
};

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const publicRoutes = ['/'];
    // Si la route est publique, laisser passer la requête
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET
    });

    if (token) {
        return NextResponse.next();
    }
    // Rediriger vers la page de connexion avec le callback URL
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
}