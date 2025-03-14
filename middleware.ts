import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export const config = {
    matcher: [
        '/content/:path*',
        '/sign-in',
        '/sign-up',
    ]
};

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Si l'utilisateur est sur sign-in ou sign-up et est déjà connecté
    // rediriger vers /content
    if (token && (pathname === '/sign-in' || pathname === '/sign-up')) {
        const response = NextResponse.redirect(new URL('/content', req.url));
        // Clear any old session data from response
        response.cookies.delete('next-auth.session-token');
        response.cookies.delete('next-auth.csrf-token');
        response.cookies.delete('next-auth.callback-url');
        // Set new session
        response.cookies.set('next-auth.session-token', token.jwt as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
        return response;
    }

    // Si l'utilisateur n'est pas connecté et essaie d'accéder à /content
    if (!token && pathname.startsWith('/content')) {
        // Nettoyer toutes les données de session
        const response = NextResponse.redirect(new URL('/sign-in', req.url));
        response.cookies.delete('next-auth.session-token');
        response.cookies.delete('next-auth.csrf-token');
        response.cookies.delete('next-auth.callback-url');
        return response;
    }

    return NextResponse.next();
}