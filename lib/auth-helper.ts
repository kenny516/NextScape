import { auth } from "./auth"

export const authHelper = async () => {
    const session = await auth();

    return session?.user;
}