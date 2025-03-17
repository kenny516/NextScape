"use server"
import { headers } from "next/headers"
import { auth } from "./auth"
import { unauthorized } from "next/navigation";

export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.user;
}

export const getRequiredUser = async () => {
    const user = await getUser();
    if (!user) {
        unauthorized();
    }
    return user;
}