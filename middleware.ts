import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Configuration du matcher pour les routes protégées
export const config = {
    matcher: ["/content/*", "/dashboard/*"],
};

// Middleware pour vérifier la session
export async function middleware(req: NextRequest) {
    // Récupérer le token JWT de la session
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    // Si le token est valide, continuer la requête
    if (token) {
        return NextResponse.next();
    }

    // Sinon, rediriger vers la page de connexion
    return NextResponse.redirect(new URL("/sign-in", req.url));
}
