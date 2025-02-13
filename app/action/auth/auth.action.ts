"use server"

import { action } from "@/lib/zsa"
import z from "zod"


export const signUpAction = action
    .input(z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    }))
    .handler(async ({ input }) => {
        console.log({ input })
    });

